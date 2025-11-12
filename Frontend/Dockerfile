# Etapa 1: Construir el proyecto
FROM node:20 AS build
WORKDIR /app

# Copiamos los archivos del proyecto
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Etapa 2: Servir los archivos con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
