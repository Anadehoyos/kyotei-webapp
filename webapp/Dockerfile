FROM node:24.14.1-alpine

WORKDIR /webapp

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@latest && \
	pnpm install

CMD [ "pnpm", "run", "dev" ]
