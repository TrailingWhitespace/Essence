# --- Stage 1: Base Image ---
FROM node:slim AS base
RUN apt-get update && apt-get install -y openssl
WORKDIR /app

# --- Stage 2: Install Dependencies ---
FROM base as deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# --- Stage 3: Builder ---
FROM base as builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application code AND prisma folder
COPY . .
COPY prisma ./prisma

# Generate Prisma Client at build time
RUN npx prisma generate

# --- Stage 4: Production Runner ---
FROM base AS runner
WORKDIR /app

# Copy only what’s needed
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/index.js ./

EXPOSE 5000

CMD ["node", "index.js"]
