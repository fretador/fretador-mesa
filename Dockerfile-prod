# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos de dependências
COPY package.json package-lock.json* ./

# Instale as dependências (incluindo as devDependencies necessárias para o build)
RUN npm install

# Copie todo o código-fonte para o container
COPY . .

# Construir o aplicativo Next.js
RUN npm run build

# Expor a porta que o aplicativo irá usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
