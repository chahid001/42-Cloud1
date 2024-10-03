#! /bin/bash

sed -i 's/listen = \/run\/php\/php7.3-fpm.sock/listen = 9001/g' /etc/php/7.3/fpm/pool.d/www.conf
mkdir -p /run/php
touch /run/php/php7.3-fpm.pid

mkdir -p /var/www/html/phpmyadmin
cd /var/www/html/phpmyadmin
wget https://files.phpmyadmin.net/phpMyAdmin/4.9.7/phpMyAdmin-4.9.7-all-languages.tar.gz
tar xvf phpMyAdmin-4.9.7-all-languages.tar.gz --strip-components=1
mv /var/www/config.inc.php /var/www/html/phpmyadmin/config.inc.php
chown -R www-data:www-data /var/www/html/phpmyadmin

php-fpm7.3 -F