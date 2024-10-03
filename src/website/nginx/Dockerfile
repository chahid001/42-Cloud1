FROM debian:buster

RUN apt -y update 
RUN apt -y install nginx openssl apt-utils

COPY ./conf/nginx.conf /etc/nginx/sites-available/default
COPY ./scripts/ssl.sh /var/ssl.sh

ENTRYPOINT ["bash", "/var/ssl.sh"]