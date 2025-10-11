

FROM node:22-alpine
WORKDIR /app

# Copy package manifests for caching
COPY package.json pnpm-lock.yaml ./

# The Prisma schema is needed for 'prisma generate' to work
COPY prisma ./prisma/

# Enable pnpm via corepack and install dependencies
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# CRITICAL STEP: Generate the Prisma Client during the build
RUN pnpm exec prisma generate

# We don't COPY the source code here; the volume mount will provide it.

EXPOSE 5000

# The default command is to start the dev server
CMD ["pnpm", "run", "dev"]