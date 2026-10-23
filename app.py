import io
import os
import subprocess
import tempfile
from pathlib import Path

from flask import Flask, jsonify, render_template, request, send_file

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 25 * 1024 * 1024  # 25 MB
MAX_CONVERSION_SECONDS = 45


@app.get("/")
def index():
    return render_template("index.html")


@app.post("/convert")
def convert():
    uploaded = request.files.get("file")
    if not uploaded or not uploaded.filename:
        return jsonify(error="Selecione um arquivo XPS para converter."), 400

    original_name = Path(uploaded.filename).name
    if Path(original_name).suffix.lower() != ".xps":
        return jsonify(error="Formato inválido. Envie um arquivo .xps."), 400

    with tempfile.TemporaryDirectory(prefix="xps2pdf_") as temp_dir:
        input_path = Path(temp_dir) / "document.xps"
        output_path = Path(temp_dir) / "document.pdf"
        uploaded.save(input_path)

        if input_path.stat().st_size == 0:
            return jsonify(error="O arquivo enviado está vazio."), 400

        try:
            result = subprocess.run(
                ["mutool", "convert", "-o", str(output_path), str(input_path)],
                cwd=temp_dir,
                capture_output=True,
                text=True,
                timeout=MAX_CONVERSION_SECONDS,
                check=False,
            )
        except FileNotFoundError:
            app.logger.exception("Executável mutool não encontrado")
            return jsonify(error="O serviço de conversão não está configurado corretamente."), 500
        except subprocess.TimeoutExpired:
            return jsonify(error="A conversão demorou demais. Tente um arquivo menor."), 408

        if result.returncode != 0 or not output_path.exists():
            app.logger.warning("Falha do mutool: %s", (result.stderr or result.stdout)[-2000:])
            return jsonify(error="Não foi possível converter este XPS. O arquivo pode estar danificado ou usar recursos incompatíveis."), 422

        with output_path.open("rb") as pdf_file:
            if pdf_file.read(5) != b"%PDF-":
                return jsonify(error="O conversor não produziu um PDF válido."), 422

        pdf_bytes = output_path.read_bytes()
        download_name = f"{Path(original_name).stem or 'documento'}.pdf"
        return send_file(
            io.BytesIO(pdf_bytes),
            mimetype="application/pdf",
            as_attachment=True,
            download_name=download_name,
            max_age=0,
        )


@app.errorhandler(413)
def file_too_large(_error):
    return jsonify(error="O arquivo excede o limite de 25 MB."), 413


@app.get("/health")
def health():
    return jsonify(status="ok"), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "10000"))
    app.run(host="0.0.0.0", port=port)
