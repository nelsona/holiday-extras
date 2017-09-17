FROM node:8.5-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm test

EXPOSE 8080

USER node

CMD ["npm", "start"]

