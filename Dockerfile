FROM node:6.11.5    

WORKDIR /speechly-rastoropov
COPY package.json .
RUN npm install    
COPY . .

CMD [ "node", "server/server.js" ] 