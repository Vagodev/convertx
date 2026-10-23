# ConvertX — Conversor XPS para PDF

Uma aplicação web simples e prática para converter arquivos **XPS em PDF** diretamente pelo navegador.

🌐 **Acesse o conversor:** [https://convertx-fhdj.onrender.com/](https://convertx-fhdj.onrender.com/)

## ✨ Funcionalidades

- 📄 Conversão de arquivos XPS para PDF.
- 🌐 Interface web acessível pelo navegador.
- 📦 Limite de tamanho de arquivo de 25 MB.
- ⚙️ Conversão utilizando MuPDF (`mutool`).
- 🐍 Backend desenvolvido em Python com Flask.
- 🚀 Deploy automatizado no Render integrado ao GitHub.

## 🛠️ Tecnologias utilizadas

- Python
- Flask
- MuPDF
- HTML, CSS e JavaScript
- Docker
- Render
- GitHub

## 🚀 Como utilizar

1. Acesse o [ConvertX](https://convertx-fhdj.onrender.com/).
2. Selecione o arquivo `.xps` que deseja converter.
3. Inicie a conversão.
4. Baixe o arquivo PDF gerado.

**Limite:** arquivos de até 25 MB.

## 💻 Como executar localmente

### Pré-requisitos

- Python instalado.
- MuPDF (`mutool`) instalado e disponível no PATH, caso execute sem Docker.
- Docker, opcionalmente, para executar a aplicação em um contêiner.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Vagodev/convertx.git
cd convertx
```

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente virtual.

**Windows:**

```bash
.venv\Scripts\activate
```

**Linux/macOS:**

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Inicie a aplicação:

```bash
python app.py
```

Abra `http://127.0.0.1:5000` no navegador, caso esse seja o endereço indicado pelo Flask.

## 📂 Estrutura do projeto

```text
convertx/
├── static/           # Arquivos estáticos da interface
├── templates/        # Páginas HTML
├── app.py            # Aplicação Flask e conversão
├── Dockerfile        # Configuração do contêiner
├── render.yaml       # Configuração de deploy no Render
├── requirements.txt  # Dependências Python
└── .dockerignore     # Arquivos ignorados pelo Docker
```

## 🔒 Privacidade e segurança

Os arquivos enviados são processados pelo servidor para realizar a conversão. Evite enviar documentos confidenciais ou sensíveis sem verificar as condições de processamento e armazenamento da aplicação.

## 📌 Limitações

- Tamanho máximo de 25 MB por arquivo.
- A conversão depende da compatibilidade do arquivo com o MuPDF.
- A disponibilidade e o tempo de resposta dependem da hospedagem.

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**. Você pode usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e vender cópias do software, desde que mantenha o aviso de copyright e o texto da licença.

Consulte o arquivo [LICENSE](LICENSE) para ver os termos completos.

---

Desenvolvido como um projeto web para facilitar a conversão de arquivos XPS para PDF.
