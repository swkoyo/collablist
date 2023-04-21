FROM node:18-alpine3.17 AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo pnpm
COPY . .
RUN turbo prune --scope=@collablist/client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine3.17 AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yml ./pnpm-lock.yml
RUN pnpm i

# Copy full repo
FROM node:18-alpine3.17 AS development
WORKDIR /app
RUN yarn global add pnpm turbo
COPY --from=builder /app/out/full/ .

# Build the project
FROM node:18-alpine3.17 AS runner
WORKDIR /app
RUN pnpm turbo run build --filter=@collablist/client...
