FROM node:7.9.0

RUN mkdir -p /fauna/lib

COPY package.json /fauna
COPY package-lock.json /fauna

WORKDIR /fauna

RUN npm install --quiet || cat npm-debug.log

VOLUME /fauna/src

EXPOSE 3000

CMD ["npm", "start"]
