# ============================================================
# Frontend Angular + Nginx - imagen para Render / Docker
# Proxy /api -> backend (misma origen, sin problemas CORS)
# ============================================================
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache gettext

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

ENV BACKEND_URL=http://localhost:8080
ENV PORT=80

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
