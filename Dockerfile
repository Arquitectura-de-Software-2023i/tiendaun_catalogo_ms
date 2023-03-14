FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./

COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]