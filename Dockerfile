FROM node:14.3

RUN curl "https://install.meteor.com/" -k | sh

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN chmod -R 700 /usr/src/app/.meteor/local
RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]