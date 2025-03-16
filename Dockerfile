FROM node:22.11.0

WORKDIR /usr/src/app

COPY package.json ./
COPY prisma/ ./prisma/
RUN rm -Rf prisma/migrations

RUN npm i -g pnpm
RUN pnpm add @prisma/client
RUN npx prisma generate
RUN pnpm install

COPY . .

RUN pnpm test
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
