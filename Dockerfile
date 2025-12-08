# FROM node:18-alpine AS deps

# # Install dependencies only when needed

# WORKDIR /app
# RUN apk add --no-cache libc6-compat
# COPY package*.json ./
# COPY tsconfig.json .env* ./
# COPY . .
# RUN npm install




# FROM node:18-alpine AS builder

# WORKDIR /app
# COPY --from=deps /app/src/ ./src/
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/package*.json ./
# COPY --from=deps /app/tsconfig.json .env* ./
# COPY --from=deps /app/.env* ./
# COPY . .
# RUN npm run build




# FROM node:18-alpine AS runner

# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/package*.json ./
# COPY --from=deps /app/tsconfig.json .env* ./
# COPY --from=builder /app/dist ./dist/
# COPY --from=deps /app/.env* ./
# COPY . .

# EXPOSE 3000

# CMD ["node", "--env-file=.env", "dist/server.js"]












# FROM node:24-alpine as deps

# # Instalar dependências do sistema
# RUN apk add --no-cache docker-cli docker-compose libc6-compat git bash

# # Diretório de trabalho
# WORKDIR /app

# # Copiar arquivos e instalar dependências Node
# COPY package*.json tsconfig.json .env* ./ 
# COPY prisma ./prisma
# RUN npm install
# RUN npx prisma generate

# # Copiar restante do código
# COPY . .

# # Build do projeto
# RUN npm run build

# EXPOSE 3000

# CMD ["node", "--env-file=.env", "dist/server.js"]

FROM node:24-alpine AS base

# Dependências necessárias para Prisma + SQLite
RUN apk add --no-cache docker-cli docker-compose libc6-compat openssl sqlite git bash

WORKDIR /app

# Copia arquivos essenciais primeiro para cache
COPY package*.json tsconfig.json .env* ./
COPY prisma ./prisma

# Instala dependências
RUN npm install

# Gera o Prisma CLIENT CORRETAMENTE (dentro do container)
RUN npx prisma generate

# Copia todo o código
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["node", "--env-file=.env", "dist/server.js"]
