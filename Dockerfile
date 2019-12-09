FROM node:12-alpine

WORKDIR /app

COPY package.json ./package.json

RUN ["npm", "i", "--only=production"]

COPY src ./src

CMD [ "npm", "start" ]