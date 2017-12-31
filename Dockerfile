# This file configures our custom software image based on the node base
# -- EXCLUSIVELY FOR DEVELOPMENT --
FROM node:9.3.0
MAINTAINER Paul Prins <paul@freshvine.co>
LABEL Description="A container to hold our documentation site. This is a static site built using Metalsmith on Node." Vendor="FreshVine.co" Version="1.0.0"

# Setup the Environment
ENV REFRESHED_AT=2017-12-30
ENV MAIN=/usr/src/app

WORKDIR ${MAIN}

# Build out the App Dependencies
ADD package.json ${MAIN}/package.json
RUN npm install --quiet
# RUN npm install forever -g


# Lets fire up Forever and get this service running
# CMD [ "/usr/src/app/scripts/run-forever.sh" ]