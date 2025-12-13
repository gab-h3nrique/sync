
# ──────────────── STAGE 1: Build ────────────────
FROM node:24-alpine AS build

RUN apk add --no-cache libc6-compat git bash openssl

WORKDIR /app

COPY package*.json tsconfig.json .env* ./
COPY prisma ./prisma

RUN npm install

RUN npx prisma generate

COPY . .
RUN npm run build

# ──────────────── STAGE 2: Runtime ────────────────
FROM node:24-alpine AS runtime

WORKDIR /app

RUN mkdir -p /app && chmod 777 /app

RUN apk add --no-cache docker-cli docker-compose libc6-compat openssl git bash

COPY --from=build /app/prisma.config.ts ./
COPY --from=build /app/package*.json ./
COPY --from=build /app/generated ./generated
COPY --from=build /app/.env* ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy && node --env-file=.env dist/server.js"]
# CMD ["sh", "-c", "npx prisma migrate deploy && node --env-file=.env dist/server.js"]
