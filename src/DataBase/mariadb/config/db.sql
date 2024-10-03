CREATE DATABASE wordpress_db;
CREATE USER 'schahid'@'%' IDENTIFIED BY '1337';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'schahid'@'%';
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root1337';
FLUSH PRIVILEGES;