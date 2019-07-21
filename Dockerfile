FROM node:10

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 6666

RUN npm install -g nodemon

CMD [ "npm", "start" ]



