FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
ARG NEXT_PUBLIC_CHAT_E2E_SECRET
ARG BACKEND_URL=http://backend:5001
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL
ENV NEXT_PUBLIC_CHAT_E2E_SECRET=$NEXT_PUBLIC_CHAT_E2E_SECRET
ENV BACKEND_URL=$BACKEND_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
