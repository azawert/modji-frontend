FROM node:20.18.0-slim AS build

WORKDIR /app

ARG ARG API_URL

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY ./ ./
RUN VITE_BACKEND_BASE_URL=$API_URL npm run build

FROM nginx:alpine AS run

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
