# FROM node:14.3

# RUN curl "https://install.meteor.com/" -k | sh

FROM registry.gitlab.com/tozd/docker/meteor:ubuntu-focal-2.7.3

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

# RUN apt-get update && apt-get install -y \
#     software-properties-common \
#     npm
# RUN npm install npm@latest -g && \
#     npm install n -g && \
#     n latest

COPY . /usr/src/app 
WORKDIR /usr/src/app

RUN npm install

# COPY . /usr/src/app
# WORKDIR /usr/src/app

# # RUN chmod -R 700 /usr/src/app/.meteor/local
# RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]