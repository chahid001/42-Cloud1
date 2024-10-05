FROM debian:buster

RUN apt -y update
RUN apt -y install wget php php7.3-fpm php-mysql sendmail

COPY ./config/wp-config.php /var/www/wp-config.php
COPY ./scripts/init.sh /var/init.sh

ENTRYPOINT [ "bash", "/var/init.sh" ]