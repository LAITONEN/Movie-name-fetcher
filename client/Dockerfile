FROM node:9.3.0   

WORKDIR /speechly-client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081

CMD [ "npm", "run", "fetch" ] 