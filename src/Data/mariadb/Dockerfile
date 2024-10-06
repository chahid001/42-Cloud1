FROM debian:buster

RUN apt -y update && apt -y install mariadb-server

RUN sed -i 's/#port/port /g' /etc/mysql/mariadb.conf.d/50-server.cnf
RUN sed -i 's/bind-address            = 127.0.0.1/bind-address            = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf

RUN echo "[mysqld]\n\
general_log = 1\n\
general_log_file = /var/log/mysql/mariadb.log" > /etc/mysql/conf.d/my.cnf

COPY ./config/db.sql /temp/db.sql

RUN service mysql start && mysql < /temp/db.sql

ENTRYPOINT [ "mysqld" ]