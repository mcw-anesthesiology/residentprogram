#!/bin/bash

# Currently for Ubuntu 16.04
add-apt-repository ppa:ondrej/php
add-apt-repository ppa:ondrej/apache2
apt install build-essential apache2 libapache2-mod-php php7.2 php7.2-mysql php7.2-xml php7.2-gd php7.2-curl php7.2-mbstring php7.2-zip php7.2-bcmath php7.2-gmp composer mysql-client mysql-server

# Set up apache2.conf

ufw allow in "Apache Full"

# A bunch of stuff I didn't record oops


# Make sure all of these are enabled for apache
# access_compat.load  authn_core.load  authz_user.load  deflate.load  filter.load       mpm_prefork.load  php7.2.load      setenvif.conf       ssl.load
# alias.conf          authn_file.load  autoindex.conf   dir.conf      mime.conf         negotiation.conf  reqtimeout.conf  setenvif.load       status.conf
# alias.load          authz_core.load  autoindex.load   dir.load      mime.load         negotiation.load  reqtimeout.load  socache_shmcb.load  status.load
# auth_basic.load     authz_host.load  deflate.conf     env.load      mpm_prefork.conf  php7.2.conf       rewrite.load     ssl.conf

# Set up deploy key
# Clone repo
# chmod -R 775 /var/www/residentprogram
# chown -R root:www-data /var/www/residentprogram
# Make sure paths are right in apache2 site conf
# Init DB and storage files

apt install software-properties-common
add-apt-repository ppa:certbot/certbot
apt update
apt install python-certbot-apache
