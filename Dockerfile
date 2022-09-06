FROM zodern/meteor
COPY --chown=app:app ../build /built_app
RUN cd /built_app/programs/server && npm install