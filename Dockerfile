# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

FROM base AS builder
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_DESCRIPTION
ARG NEXT_PUBLIC_OWNER_NAME
ARG NEXT_PUBLIC_JOB_TITLE
ARG NEXT_PUBLIC_LOGO_TEXT

ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_DESCRIPTION=$NEXT_PUBLIC_SITE_DESCRIPTION
ENV NEXT_PUBLIC_OWNER_NAME=$NEXT_PUBLIC_OWNER_NAME
ENV NEXT_PUBLIC_JOB_TITLE=$NEXT_PUBLIC_JOB_TITLE
ENV NEXT_PUBLIC_LOGO_TEXT=$NEXT_PUBLIC_LOGO_TEXT
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
