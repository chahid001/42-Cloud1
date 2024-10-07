#! /bin/bash

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/tsl.key \
        -out /etc/ssl/certs/tsl.crt \
        -subj "/C=MA/ST=Rabat/L=Rabat/O=LEET/OU=schahid/CN=schahid@42.fr"

nginx -g 'daemon off;'