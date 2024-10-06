# phpmyadmin/Dockerfile

FROM debian:buster

# Install necessary packages for phpMyAdmin
RUN apt-get update && \
    apt-get install -y apache2 php libapache2-mod-php php-mysql php-zip php-gd php-json php-mbstring curl && \
    rm -rf /var/lib/apt/lists/*

# Download phpMyAdmin
RUN curl -o /tmp/phpmyadmin.tar.gz -L https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz && \
    tar -xzf /tmp/phpmyadmin.tar.gz -C /var/www/html/ && \
    mv /var/www/html/phpMyAdmin-* /var/www/html/phpmyadmin && \
    chown -R www-data:www-data /var/www/html/phpmyadmin

# Copy Apache configuration
COPY ./config/apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

RUN cp /var/www/html/phpmyadmin/config.sample.inc.php /var/www/html/phpmyadmin/config.inc.php && \
    sed -i "s/\$cfg\['blowfish_secret'\] = '';/\$cfg\['blowfish_secret'\] = 'some_random_string';/" /var/www/html/phpmyadmin/config.inc.php && \
    echo "\$cfg['Servers'][1]['host'] = 'mariadb';" >> /var/www/html/phpmyadmin/config.inc.php

# Expose HTTP port
EXPOSE 80

# Start Apache server
CMD ["apachectl", "-D", "FOREGROUND"]