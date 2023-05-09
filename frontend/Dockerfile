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

CMD ["sh", "-c", "HOST=localhost PORT=4444 npx y-websocket & npm start"] 