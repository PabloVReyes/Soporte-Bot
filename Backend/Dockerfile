FROM node:20
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Compila el proyecto
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]