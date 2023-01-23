FROM node:14-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i npx -g
RUN npm ci

COPY . .
RUN npx craco build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
