FROM node:21

WORKDIR /dist/index.js

COPY package.json ./

RUN npm install 

COPY . .

ENV PORT=3032

EXPOSE 3032

CMD [ "npm", "start" ]