FROM node:18-slim as development

WORKDIR /vid-splitter/server/

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-slim as production

ENV NODE_ENV=production

WORKDIR /vid-splitter/server/

COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production

COPY --from=development /vid-splitter/server/dist ./dist

CMD ["node", "dist/app.js"]
