FROM node:20-bullseye

WORKDIR /app

# deps + prisma
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

# tsconfig + src
COPY tsconfig*.json ./
COPY src ./src

# сборка и запуск без watch
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
