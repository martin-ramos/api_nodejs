FROM node:16-alpine

WORKDIR /api_customer

COPY . /api_customer

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
