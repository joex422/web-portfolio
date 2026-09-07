# Multi-stage build following Next.js's own standalone-output pattern
# (https://github.com/vercel/next.js/tree/canary/examples/with-docker).
# Built by GitHub Actions, not locally — this VM has no container runtime.

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runtime image ---
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Non-root: standard Next.js example UID/GID, kept out of the range Kubernetes
# nodes/system accounts typically use.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Standalone output already contains only the traced node_modules subset —
# .next/static and public are excluded from it by design (see Next's docs)
# and copied in separately here.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Matches the Service's targetPort in the GitOps manifests. Binding 0.0.0.0
# is required — the standalone server defaults to localhost otherwise, which
# is unreachable from outside the pod.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]
