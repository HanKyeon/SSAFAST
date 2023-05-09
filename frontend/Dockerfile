# base image
FROM node:lts as build

# working directory
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code to the container
COPY . .

# start build
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "PORT=4444 node ./node_modules/y-webrtc/bin/server.js & npm start"]