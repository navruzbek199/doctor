FROM node:14 as build

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Copy app source code
COPY . .

# Build app using CRACO
RUN npm run build

#
# Use nginx as runtime
#
FROM nginx:1.19

# Copy build files to nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
