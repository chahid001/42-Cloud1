FROM debian:buster

RUN apt -y update
RUN apt -y install wget php php7.3-fpm php-mysql sendmail

COPY ./config/wp-config.php /var/www/wp-config.php
COPY ./scripts/init.sh /var/init.sh

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.9.1-amd64.deb && \
    dpkg -i metricbeat-7.9.1-amd64.deb

RUN echo 'output.elasticsearch:\n\
    hosts: ["10.0.3.2:9200"]\n\
    username: "elastic"\n\
    password: "password"\n\
  setup.kibana:\n\
    host: "10.0.3.2:5601"' >> /etc/metricbeat/metricbeat.yml

ENTRYPOINT [ "bash", "/var/init.sh" ]