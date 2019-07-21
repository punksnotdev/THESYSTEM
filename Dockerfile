FROM node:11

WORKDIR /


COPY . .

COPY package.json package.json

RUN npm install

#RUN git submodule update --init --recursive

EXPOSE 6666

RUN npm install -g nodemon

CMD [ "npm", "start" ]



