FROM node:18 as development

WORKDIR /vid-splitter/server/

RUN apt-get update && \
    apt-get install -y ffmpeg

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18 as production

ENV NODE_ENV=production

WORKDIR /vid-splitter/server/

COPY package.json .
COPY package-lock.json .

# Combine installation of ffmpeg into a single RUN command
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm ci --only=production

COPY --from=development /vid-splitter/server/dist ./dist

CMD ["node", "dist/app.js"]
