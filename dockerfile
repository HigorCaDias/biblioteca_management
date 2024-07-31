# Usar uma imagem base oficial do Node.js
FROM node:14

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compilar o código TypeScript
RUN npx tsc

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
