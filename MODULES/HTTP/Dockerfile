FROM node:11 as build-stage
WORKDIR /MONITOR
COPY /MONITOR .
COPY MONITOR/package.json package.json

RUN npm install
# RUN npm run build

FROM nginx:alpine as production-stage
COPY --from=build-stage /MONITOR/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]