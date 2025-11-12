FROM node:20
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Generar cliente de Prisma
RUN yarn prisma generate

EXPOSE 3000
CMD ["yarn", "start"]
