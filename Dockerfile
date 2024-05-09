# Escolha a imagem base do Node.js
FROM node:latest
# Crie um diretório para onde o código do aplicativo será colocado
WORKDIR /usr/src/app

# Atualize a lista de pacotes e instale o Ghostscript
RUN apt-get update -y && apt-get install -y ghostscript

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm ci --ignore-scripts

# Copie o restante do código do aplicativo
COPY . .

# Compile o TypeScript
RUN npm run compile

# Expõe a porta que o aplicativo usa
EXPOSE 8000

# Comando para iniciar o aplicativo
CMD [ "npm", "start" ]
