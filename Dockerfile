FROM node:18

RUN apt-get update && \
    apt-get install -y ffmpeg

WORKDIR /vid-splitter/server/

COPY package*.json .
RUN npm install

COPY . .
RUN npx tsc

EXPOSE 6969

ENTRYPOINT [ "node" , "dist/app.js"]