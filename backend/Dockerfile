# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala TUDO (inclusive @nestjs/cli)
RUN npm install

# Copia o restante do código
COPY . .

# Compila o código
RUN npm run build

# Inicia a aplicação
CMD ["npm", "run", "start:prod"]