FROM node:18

RUN apt-get update && \
    apt-get install -y ffmpeg

WORKDIR /vid-splitter/server/

ENV NODE_ENV=production

COPY package*.json .
RUN npm install --production

COPY . .
RUN npx tsc

EXPOSE 6969

ENTRYPOINT [ "node" , "dist/app.js"]