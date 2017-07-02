FROM node:8.0.0-alpine

# RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories
# RUN apk add --no-cache yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python

RUN npm install --quiet npm -g && \
  npm install --quiet node-gyp -g && \
  npm install --only=prod --quiet &&

RUN npm cache clean && \
  apk del native-deps

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
