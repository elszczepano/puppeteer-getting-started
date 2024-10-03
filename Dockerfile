FROM node:22.9.0-alpine

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app
COPY package.json ./

RUN apk add --no-cache \
    chromium

RUN npm install
COPY tsconfig*.json ./
COPY src src
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]