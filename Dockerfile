# Multi-stage build for Architect Command Center
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server ./server

RUN npm install --omit=dev

EXPOSE 3001
EXPOSE 3000

# Script to run both frontend and backend
CMD ["sh", "-c", "node server/server.js & npx vite preview --host 0.0.0.0 --port 3000"]
