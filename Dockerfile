FROM node:alpine

WORKDIR /

COPY . .
RUN npm install
RUN npm run build
COPY src src
COPY src/views dist/views

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]