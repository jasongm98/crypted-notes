FROM node:12.18.3-alpine
LABEL No Reply jason@jgmweb.es

# Specify the directory where the application's code will live
RUN mkdir /var/app
WORKDIR /var/app

COPY package*.json /var/app/

# Install dependencies
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install

EXPOSE 5000

# Start APP
CMD ["npm", "run", "start"]
