FROM node:14-alpine

WORKDIR /APP

COPY package.json .

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "run", "dev"]