FROM node:9.3.0   

WORKDIR /speechly-rastoropov
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD [ "npm", "start" ] 