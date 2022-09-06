FROM geoffreybooth/meteor-base:2.7.3

# ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

# RUN curl "https://install.meteor.com" -k | sh

COPY . /usr/src/app
WORKDIR /usr/src/app

# RUN chmod -R 700 /usr/src/app/.meteor/local
RUN meteor npm install

EXPOSE 3000
CMD ["meteor npm", "start"]