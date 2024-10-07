FROM debian:buster

RUN apt -y update && apt -y install mariadb-server

RUN sed -i 's/#port/port /g' /etc/mysql/mariadb.conf.d/50-server.cnf
RUN sed -i 's/bind-address            = 127.0.0.1/bind-address            = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf

RUN echo "[mysqld]\n\
general_log = 1\n\
general_log_file = /var/log/mysql/mariadb.log" > /etc/mysql/conf.d/my.cnf

COPY ./config/db.sql /temp/db.sql

RUN service mysql start && mysql < /temp/db.sql

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

RUN filebeat modules enable mysql
RUN filebeat setup && service filebeat start

RUN metricbeat modules enable mysql
RUN metricbeat setup && service metricbeat start

ENTRYPOINT [ "mysqld" ]