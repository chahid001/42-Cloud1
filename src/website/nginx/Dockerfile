FROM debian:buster

RUN apt -y update 
RUN apt -y install nginx openssl apt-utils

COPY ./config/nginx.conf /etc/nginx/sites-available/default
COPY ./scripts/ssl.sh /var/ssl.sh

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.9.1-amd64.deb && \
    dpkg -i filebeat-7.9.1-amd64.deb

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.9.1-amd64.deb && \
    dpkg -i metricbeat-7.9.1-amd64.deb

RUN echo 'output.elasticsearch:\n\
    hosts: ["10.0.3.2:9200"]\n\
    username: "elastic"\n\
    password: "password"\n\
  setup.kibana:\n\
    host: "10.0.3.2:5601"' >> /etc/filebeat/filebeat.yml

RUN echo 'output.elasticsearch:\n\
    hosts: ["10.0.3.2:9200"]\n\
    username: "elastic"\n\
    password: "password"\n\
  setup.kibana:\n\
    host: "10.0.3.2:5601"' >> /etc/metricbeat/metricbeat.yml

ENTRYPOINT ["bash", "/var/ssl.sh"]