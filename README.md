# ConvertX — Conversor XPS para PDF

Uma aplicação web simples e prática para converter arquivos **XPS em PDF** diretamente pelo navegador.

🌐 **Acesse o conversor:** [https://convertx-fhdj.onrender.com/](https://convertx-fhdj.onrender.com/)

## ✨ Funcionalidades

- 📄 Conversão de arquivos XPS para PDF.
- 🌐 Interface web acessível pelo navegador.
- 📦 Limite de tamanho de arquivo de 25 MB.
- ⚙️ Conversão processada no servidor utilizando MuPDF.
- 🐍 Backend desenvolvido em Python com Flask.
- 🚀 Deploy automatizado no Render integrado ao GitHub.

## 🛠️ Tecnologias utilizadas

- **Python** — linguagem principal.
- **Flask** — framework web.
- **MuPDF (mutool)** — ferramenta utilizada na conversão dos arquivos.
- **HTML, CSS e JavaScript** — interface do usuário.
- **Docker** — configuração do ambiente de execução.
- **Render** — hospedagem da aplicação.
- **GitHub** — versionamento e gerenciamento do código-fonte.

## 🚀 Como utilizar

1. Acesse o [ConvertX](https://convertx-fhdj.onrender.com/).
2. Selecione o arquivo `.xps` que deseja converter.
3. Inicie a conversão.
4. Baixe o arquivo PDF gerado.

**Observação:** arquivos muito grandes podem ultrapassar o limite permitido pela aplicação.

## 💻 Como executar localmente

### Pré-requisitos

- Python instalado.
- Docker instalado, caso queira executar pelo contêiner.
- MuPDF (`mutool`) disponível no ambiente de execução.

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

Depois, acesse no navegador o endereço local indicado pelo Flask, normalmente `http://127.0.0.1:5000`.

> **Importante:** para executar localmente, o ambiente também precisa ter o executável `mutool` instalado e disponível no PATH. A imagem Docker do projeto pode ser utilizada para preparar o ambiente de execução, conforme configurado no `Dockerfile`.

## 📂 Estrutura do projeto

```text
convertx/
├── static/          # Arquivos estáticos da interface
├── templates/       # Páginas HTML
├── app.py           # Aplicação Flask e conversão
├── Dockerfile       # Configuração do contêiner
├── render.yaml      # Configuração de deploy no Render
├── requirements.txt # Dependências Python
└── .dockerignore    # Arquivos ignorados pelo Docker
```

## 🔒 Privacidade e segurança

Os arquivos enviados são processados pelo servidor para realizar a conversão. Não envie documentos confidenciais ou sensíveis sem antes verificar as condições de armazenamento e processamento da aplicação.

## 📌 Limitações

- O tamanho máximo permitido por arquivo é de 25 MB.
- A conversão depende do suporte do MuPDF ao arquivo enviado.
- A disponibilidade e o tempo de resposta dependem do serviço de hospedagem.

## 📄 Licença

Este projeto ainda não especifica uma licença de distribuição. Caso queira permitir que outras pessoas utilizem, modifiquem ou redistribuam o código, adicione uma licença apropriada ao repositório.

---

Desenvolvido como um projeto web para facilitar a conversão de arquivos XPS para PDF.
