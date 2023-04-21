FROM node:18-alpine3.17 AS builder
RUN apk add --no-cache libc6-compat openssl1.1-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@collablist/server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine3.17 AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN yarn global add pnpm
RUN pnpm i

# Copy full repo
FROM node:18-alpine3.17 AS development
WORKDIR /app
RUN yarn global add pnpm turbo
COPY --from=builder /app/out/full/ .

# Build the project
FROM node:18-alpine3.17 AS runner
WORKDIR /app
RUN pnpm turbo run build --filter=@collablist/server...


# FROM node:18-alpine AS development

# RUN apt-get update && apt-get install -y procps openssl

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm install glob rimraf
# RUN npm install --only=development

# COPY . .

# RUN npm run build

# FROM node:18-slim AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]

# DEPS