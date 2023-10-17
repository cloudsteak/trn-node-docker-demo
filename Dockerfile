FROM node:18.17.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]