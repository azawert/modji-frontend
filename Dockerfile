FROM node:slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx:alpine AS run

# RUN apt-get update && apt-get install -y curl

COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]