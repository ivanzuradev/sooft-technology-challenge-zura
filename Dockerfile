FROM node:22

WORKDIR /usr/src/app

COPY package.json ./
COPY prisma/ ./prisma/

RUN npm i -g pnpm
RUN pnpm install
RUN pnpm add @prisma/client
RUN npx prisma generate

COPY . .

RUN pnpm test
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
