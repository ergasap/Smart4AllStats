FROM node:lts-bullseye

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN apt update

EXPOSE 8080
CMD ["node", "src/app.js"]
