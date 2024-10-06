#! /bin/bash

sed -i 's/listen = \/run\/php\/php7.3-fpm.sock/listen = 9000/g' /etc/php/7.3/fpm/pool.d/www.conf

mkdir -p /run/php
touch /run/php/php7.3-fpm.pid

mkdir -p /var/www/html

wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp

cd /var/www/html

wp core download --allow-root

mv /var/www/wp-config.php /var/www/html
wp core install --allow-root --url=${URL} --title=${WORDPRESS_NAME} --admin_user=${WORDPRESS_ROOT_LOGIN} --admin_password=${DB_ROOT_PASSWORD} --admin_email=${WORDPRESS_ROOT_EMAIL}
wp user create ${DB_USER} ${WORDPRESS_USER_EMAIL} --user_pass=${DB_PASSWORD} --role=author --allow-root

wp plugin install redis-cache --allow-root
wp plugin update --all --allow-root
wp plugin activate redis-cache --allow-root
wp redis enable --allow-root

chown -R www-data:www-data /var/www/html/wp-content
chmod -R 755 /var/www/html/wp-content

echo "Wordpress started"
php-fpm7.3 -F