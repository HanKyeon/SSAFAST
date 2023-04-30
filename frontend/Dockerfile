# base image
FROM node:lts as build

# working directory
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package*.json .

# install dependencies
RUN npm install

# start build
RUN npm run build

# copy the rest of the application code to the container
COPY . .

# nginx base image
FROM nginx:alpine

# copy build files to nginx container
COPY --from=build /app/build /usr/share/nginx/html

# delete nginx default.conf
RUN rm /etc/nginx/conf.d/default.conf

# copy nginx.conf in host to container
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]