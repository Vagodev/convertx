const form = document.querySelector("#convert-form");
const input = document.querySelector("#file-input");
const dropzone = document.querySelector("#dropzone");
const fileLabel = document.querySelector("#file-label");
const selectedFile = document.querySelector("#selected-file");
const selectedName = document.querySelector("#selected-name");
const removeButton = document.querySelector("#remove-file");
const convertButton = document.querySelector("#convert-button");
const buttonText = document.querySelector("#button-text");
const statusBox = document.querySelector("#status");
const MAX_BYTES = 25 * 1024 * 1024;

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`;
  statusBox.hidden = false;
}
function hideStatus() {
  statusBox.hidden = true;
  statusBox.textContent = "";
}
function setFile(file) {
  hideStatus();
  if (!file) {
    input.value = "";
    selectedFile.hidden = true;
    fileLabel.textContent = "Arraste seu arquivo aqui";
    return;
  }
  if (!file.name.toLowerCase().endsWith(".xps")) {
    input.value = "";
    selectedFile.hidden = true;
    showStatus("Selecione um arquivo com extensão .xps.", "error");
    return;
  }
  if (file.size > MAX_BYTES) {
    input.value = "";
    selectedFile.hidden = true;
    showStatus("O arquivo excede o limite de 25 MB.", "error");
    return;
  }
  selectedName.textContent = file.name;
  selectedFile.hidden = false;
  fileLabel.textContent = "Arquivo selecionado";
}
input.addEventListener("change", () => setFile(input.files[0]));
removeButton.addEventListener("click", () => setFile(null));

for (const eventName of ["dragenter", "dragover"]) {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  });
}
for (const eventName of ["dragleave", "drop"]) {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
  });
}
dropzone.addEventListener("drop", (event) => {
  const file = event.dataTransfer.files[0];
  if (!file) return;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  input.files = transfer.files;
  setFile(file);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = input.files[0];
  if (!file) {
    showStatus("Selecione um arquivo XPS antes de continuar.", "error");
    return;
  }

  const body = new FormData();
  body.append("file", file);
  convertButton.disabled = true;
  buttonText.textContent = "Convertendo…";
  showStatus("Processando o documento. Não feche esta página.", "info");

  try {
    const response = await fetch("/convert", { method: "POST", body });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) {
      let message = "Não foi possível converter o arquivo.";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        message = data.error || message;
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    if (!blob.size) throw new Error("O PDF recebido está vazio.");

    const disposition = response.headers.get("content-disposition") || "";
    const match = disposition.match(/filename="?([^";]+)"?/i);
    const filename = match ? match[1] : file.name.replace(/\.xps$/i, "") + ".pdf";
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showStatus("Conversão concluída! O download do PDF foi iniciado.", "success");
  } catch (error) {
    showStatus(error.message || "Ocorreu um erro inesperado. Tente novamente.", "error");
  } finally {
    convertButton.disabled = false;
    buttonText.textContent = "Converter para PDF";
  }
});
