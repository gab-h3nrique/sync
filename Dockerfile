FROM node:24-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package*.json ./
COPY tailwind.config.ts postcss.config.mjs ./
RUN npm install


FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tailwind.config.ts /app/postcss.config.mjs ./
COPY . .
RUN npx prisma generate
# RUN npx prisma db push
RUN npm run build


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/tailwind.config.ts /app/postcss.config.mjs ./

# COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV NEXT_TELEMETRY_DISABLED 1

# EXPOSE 3000
# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]