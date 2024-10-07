#! /bin/bash

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/tsl.key \
        -out /etc/ssl/certs/tsl.crt \
        -subj "/C=MA/ST=Rabat/L=Rabat/O=LEET/OU=schahid/CN=schahid@42.fr"

filebeat modules enable nginx
filebeat setup
service filebeat start

metricbeat modules enable nginx
metricbeat setup
service metricbeat start

nginx -g 'daemon off;'