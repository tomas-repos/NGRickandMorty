# Etapa 1: build de Angular
FROM node:20.19.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: servidor Nginx
FROM nginx:1.25.4-alpine
COPY --from=build /app/dist/NGRickandMorty/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
