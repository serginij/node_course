FROM node:alpine

WORKDIR /

COPY . .
RUN npm install && npm install tsc -g
RUN npm run build
COPY src src
COPY src/views build/views

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]