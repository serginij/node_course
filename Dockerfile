FROM node:alpine

WORKDIR /code

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install && npm install tsc -g
RUN npm run build
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]