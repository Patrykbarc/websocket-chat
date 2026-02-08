FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@8.15.6

COPY . .

RUN pnpm install --frozen-lockfile --filter api...

RUN pnpm --filter api run build

EXPOSE 5001

CMD ["node", "apps/api/dist/index.cjs"]
