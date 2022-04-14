FROM node:16
# Create app directory
WORKDIR /usr/src/app
RUN apt-get update
# Install the postgresql-client so Postgresql-dump-api node.js can use pg_dump command
RUN apt-get install -y postgresql-client
# Clean APT
RUN  apt-get clean
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 3000
# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "server.js" ]

#####################################################################
#!#     docker build . -t <your username>/postgresql-dump-api     #!#
#####################################################################

#####################################################################
#!# minikube image build -t <your username>/postgresql-dump-api . #!#
#####################################################################