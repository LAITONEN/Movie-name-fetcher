FROM node:9.3.0   

WORKDIR /speechly-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD [ "npm", "start" ] 