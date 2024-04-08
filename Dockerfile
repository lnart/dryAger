FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN ls -a 

RUN npm run build
RUN ls -a 
RUN ls dist

ENV PORT=3032
EXPOSE 3032

CMD [ "npm", "start" ]