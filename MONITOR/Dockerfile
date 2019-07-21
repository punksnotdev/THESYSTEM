FROM node:11 as build-stage
VOLUME /MONITOR
WORKDIR /MONITOR
COPY . .
# COPY MONITOR/package.json package.json

RUN npm install

FROM nginx:alpine as production-stage
# COPY LANDING /usr/share/nginx/html
# COPY --from=build-stage /html/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]