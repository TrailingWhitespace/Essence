# backend/Dockerfile

# --- Stage 1: Base Image ---
# Start from the official, reliable Node.js 20 slim image
FROM node:20-slim AS base
WORKDIR /app

# --- Stage 2: Install Dependencies ---
# This stage is only for installing dependencies, which optimizes Docker's caching.
FROM base as deps

# Enable pnpm using Corepack, which is bundled with Node.js
# Then, install dependencies. This layer is only rebuilt if package.json/pnpm-lock.yaml change.
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# --- Stage 3: Builder ---
# This stage is for building the application if needed (e.g., for TypeScript)
FROM base as builder
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# (Optional) If you were using TypeScript, your build command would go here
# RUN pnpm run build


# --- Stage 4: Production Runner ---
# This is the final, lightweight image
FROM base AS runner
WORKDIR /app

# Copy only the necessary files from the previous stages
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/index.js ./

# Expose the port the app runs on
EXPOSE 5000

# The command to start the application
CMD ["node", "index.js"]