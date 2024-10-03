FROM debian:buster

RUN apt -y update
RUN apt -y install wget php php7.3-fpm php-cgi php-mysqli \
            php-pear php-mbstring libapache2-mod-php \
            php-common php-phpseclib php-mysql

COPY ./conf/config.inc.php /var/www/config.inc.php
COPY ./scripts/init.sh /var/init.sh

ENTRYPOINT [ "bash", "/var/init.sh" ]