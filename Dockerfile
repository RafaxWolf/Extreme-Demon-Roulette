FROM node:24-alpine

WORKDIR /roulette

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run update-db

CMD [ "npm", "run", "build" ]