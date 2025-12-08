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

# ──────────────── STAGE 1: Build ────────────────
# FROM node:24-alpine AS build

# # Dependências do sistema necessárias para Prisma
# RUN apk add --no-cache libc6-compat git bash openssl sqlite

# # Diretório de trabalho
# WORKDIR /app

# # Copiar arquivos essenciais e instalar dependências
# COPY package*.json tsconfig.json .env* ./
# COPY prisma ./prisma

# RUN npm install
# RUN npx prisma generate

# # Copiar restante do código e buildar TS
# COPY . .
# RUN npm run build

# # ──────────────── STAGE 2: Runtime ────────────────
# FROM node:24-alpine AS runtime

# WORKDIR /app

# RUN mkdir -p /app && chmod 777 /app

# # Dependências mínimas para rodar Node e Prisma
# RUN apk add --no-cache docker-cli docker-compose libc6-compat openssl sqlite git bash

# # Copiar build e node_modules do stage anterior
# COPY --from=build /app/.env* ./
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/prisma ./prisma

# # Copiar o banco SQLite
# COPY database.db ./database.db

# # Garantir permissão de escrita para o SQLite
# RUN chmod 666 ./database.db
# RUN chmod 666 /app/database.db

# EXPOSE 3000

# CMD ["node", "--env-file=.env", "dist/server.js"]



FROM node:24-alpine as runtime

# Instalar dependências do sistema
RUN apk add --no-cache docker-cli docker-compose libc6-compat git bash

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos e instalar dependências Node
COPY package*.json tsconfig.json .env* ./ 
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

# Copiar restante do código
COPY . .

# Build do projeto
RUN npm run build

COPY database.db ./database.db
RUN chmod 666 ./database.db
RUN chmod 666 /app/database.db

EXPOSE 3000

CMD ["node", "--env-file=.env", "dist/server.js"]
