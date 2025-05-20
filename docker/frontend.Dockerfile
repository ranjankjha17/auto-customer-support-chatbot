# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm ci

# Copy and build
COPY ../frontend .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production

# Copy built assets
COPY --from=builder /app/package.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Runtime config
EXPOSE 3000
CMD ["npm", "start"]