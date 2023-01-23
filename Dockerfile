FROM node:14-alpine AS build

WORKDIR /app

COPY package.json yarn.lock craco.config.js ./

RUN yarn install

COPY . .
RUN yarn build

FROM nginx:alpine

#!/bin/sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
