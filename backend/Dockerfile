FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY backend/ .

# Gerar a build do backend
RUN npm run build

# Expor porta
EXPOSE 3333

# Iniciar aplicação
CMD ["npm", "run", "dev"]
