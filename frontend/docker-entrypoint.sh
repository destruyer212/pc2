#!/bin/sh
set -e

export PORT="${PORT:-80}"
export BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"

# Quitar barra final si existe
BACKEND_URL=$(echo "$BACKEND_URL" | sed 's|/$||')
export BACKEND_HOST=$(echo "$BACKEND_URL" | sed -e 's|https\?://||' -e 's|:.*||' -e 's|/.*||')

echo "Nginx PORT=$PORT"
echo "Proxy API -> ${BACKEND_URL}/api/ (Host: $BACKEND_HOST)"

envsubst '${PORT} ${BACKEND_URL} ${BACKEND_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
