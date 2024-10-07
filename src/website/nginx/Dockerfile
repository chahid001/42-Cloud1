FROM debian:buster

RUN apt -y update 
RUN apt -y install nginx openssl apt-utils curl

COPY ./config/nginx.conf /etc/nginx/sites-available/default
COPY ./scripts/ssl.sh /var/ssl.sh

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.9.1-amd64.deb && \
    dpkg -i filebeat-7.9.1-amd64.deb

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.9.1-amd64.deb && \
    dpkg -i metricbeat-7.9.1-amd64.deb

COPY ./config/filebeat.yml /etc/filebeat/filebeat.yml
COPY ./config/metricbeat.yml /etc/metricbeat/metricbeat.yml

RUN filebeat modules enable nginx
RUN metricbeat modules enable nginx

ENTRYPOINT ["bash", "/var/ssl.sh"]