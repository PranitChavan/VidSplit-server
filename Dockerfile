FROM node:18

RUN apt-get update && \
    apt-get install -y ffmpeg

WORKDIR /vid-splitter/server/

COPY package.json /vid-splitter/server/
RUN npm install

COPY . .
RUN npx tsc

ENTRYPOINT [ "node" , "dist/app.js"]