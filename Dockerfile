# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install all dependencies (including devDependencies for build)
# Copy config files first to optimize caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN node ace build --ignore-ts-errors

# Stage 2: Runtime
FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install only production dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --prod --frozen-lockfile

# Copy build artifacts from builder stage
COPY --from=builder /app/build ./build

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3333

CMD ["node", "build/bin/server.js"]
