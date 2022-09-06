FROM zodern/meteor
RUN meteor build --directory /usr/src/app
COPY --chown=app:app /usr/src/app /built_app
RUN cd /built_app/programs/server && npm install