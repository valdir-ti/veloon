FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY frontend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY frontend/ .

# Expor porta do frontend
EXPOSE 3000

# Definir a porta e expor para a rede
ENV PORT=3000
ENV VITE_PORT=3000
ENV HOST=0.0.0.0

# Comando para iniciar o desenvolvimento
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
