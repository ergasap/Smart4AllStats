FROM node:lts-bullseye

WORKDIR /usr/src/app

COPY . .

RUN npm config set proxy http://proxy.upv.es:8080
RUN npm config set https-proxy http://proxy.upv.es:8080
RUN npm install
RUN apt update

EXPOSE 8080
CMD ["node", "src/app.js"]
