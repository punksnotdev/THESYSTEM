FROM node:11





# RUN mkdir /RTSYNC-run

WORKDIR /RTSYNC

# COPY package.json ./

# COPY package.json ./RTSYNC
# COPY . /RTSYNC
# COPY package.json ./

RUN npm install

COPY . .

# COPY /RTSYNC /RTSYNC/

# COPY /RTSYNC/package.json /RTSYNC/package.json
# COPY /RTSYNC .


VOLUME /RTSYNC


EXPOSE 4000

RUN npm install -g nodemon

CMD [ "npm", "start" ]



