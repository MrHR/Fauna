FROM node:7.9.0

RUN mkdir -p /fauna/lib

COPY package.json /fauna
COPY package-lock.json /fauna

WORKDIR /fauna
RUN npm install -g create-react-app
RUN chown node:node -R .
RUN npm install --quiet || cat npm-debug.log

VOLUME /fauna/public
VOLUME /fauna/src

RUN ls -la /fauna

CMD ["npm", "start"]
