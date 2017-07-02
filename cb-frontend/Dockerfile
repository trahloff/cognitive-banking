FROM node:6.10.1-alpine

# RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories
# RUN apk add --no-cache yarn

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --only=prod && npm cache clean

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
