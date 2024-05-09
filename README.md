# Projeto de Upload e Compressão de PDF

Este projeto é uma aplicação Express que permite o upload de arquivos PDF, realiza a compressão desses arquivos e retorna o tamanho antes e depois da compressão.

## Pré-requisitos

Para rodar este projeto, você precisa ter os seguintes itens instalados em seu ambiente:

- [Node.js](https://nodejs.org/): Este projeto é construído em Node.js.
- npm: Este projeto usa npm como gerenciador de pacotes.
- TypeScript: Este projeto é escrito em TypeScript.
- Multer: Usado para lidar com o upload de arquivos.
- Express: Usado para criar o servidor web.
- [Ghostscript](https://www.ghostscript.com/download/gsdnld.html): Este projeto usa o Ghostscript para a compressão de arquivos PDF.

## Como usar

1. Clone este repositório para o seu ambiente local.
2. Navegue até a pasta do projeto e instale as dependências com o comando `npm install`.
3. Inicie o servidor com o comando `npm start`.
4. Faça uma solicitação POST para a rota `/upload` com um arquivo PDF no corpo da solicitação.
5. O servidor irá retornar o tamanho do arquivo antes e depois da compressão.

OBS: Pode-se iniciar o projeto utilizando `docker-compose up -d`

## Detalhes do código

O código principal está no arquivo `router.ts`. Ele define uma rota POST `/upload` que aceita um arquivo PDF, lê o arquivo, converte para base64, exclui o arquivo temporário, calcula o tamanho do arquivo antes e depois da compressão e retorna esses tamanhos como resposta.

O arquivo `compressPDF.ts` contém a função `compressPdf` que é usada para comprimir o arquivo PDF. Esta função usa o Ghostscript para realizar a compressão. O Ghostscript é uma ferramenta poderosa que permite manipular arquivos PDF e PostScript. Neste projeto, ele é usado para reduzir o tamanho do arquivo PDF sem perder a qualidade.
