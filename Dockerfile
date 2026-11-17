# syntax=docker/dockerfile:1

# Stage 1: Build the static Next.js website
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install

# Copy configuration and source files
COPY . .

# Build static HTML export to /app/out
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# Stage 2: Ultra-lightweight production server (~10-15MB RAM)
FROM nginx:alpine-slim AS runner

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check for CasaOS container monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
