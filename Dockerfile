FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN tsc

ENV PORT=3032

EXPOSE 3032

CMD [ "npm", "start" ]