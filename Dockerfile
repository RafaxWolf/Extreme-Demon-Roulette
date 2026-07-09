FROM node:24-alpine

WORKDIR /roulette

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run update-demon-list

CMD [ "npm", "run", "build" ]