FROM node:8.0.0-alpine

# RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories
# RUN apk add --no-cache yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY . /usr/src/app

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python

RUN npm install --quiet node-gyp yarn -g && \
    yarn --prod --quiet

RUN apk del native-deps

CMD [ "npm", "start" ]
