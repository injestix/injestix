FROM ubuntu:14.04

WORKDIR /home/injestix/admin/angular
ADD . /home/injestix

RUN apt-get update && apt-get install -y \
    npm \
    git \
    nodejs-legacy \
    && npm install \
    && npm install -g bower \
    && npm install -g grunt-cli \
    && bower install --config.interactive=false --allow-root

EXPOSE 9000
