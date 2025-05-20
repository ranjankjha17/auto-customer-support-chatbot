FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY ../backend/package.json ../backend/package-lock.json ./
RUN npm ci --only=production

# Copy app source
COPY ../backend .

# Build if using TypeScript
RUN if [ -f tsconfig.json ]; then npm run build; fi

# Environment
ENV PORT=3001
ENV NODE_ENV=production

# Runtime config
EXPOSE 3001
CMD ["node", "dist/server.js"]