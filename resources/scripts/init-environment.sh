#!/bin/bash

# Currently for Ubuntu 16.04
add-apt-repository ppa:ondrej/php
add-apt-repository ppa:ondrej/apache2
apt update
apt install build-essential apache2 libapache2-mod-php php7.2 php7.2-mysql php7.2-xml php7.2-gd php7.2-curl php7.2-mbstring php7.2-zip php7.2-bcmath php7.2-gmp composer mysql-client mysql-server

# Install node
curl -sL https://deb.nodesource.com/setup_10.x | bash -
# Install yarn
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update && apt install yarn

# Set up apache2.conf

ufw allow in "Apache Full"

# A bunch of stuff I didn't record oops


# Make sure all of these are enabled for apache
a2enmod access_compat.load authn_core.load authz_user.load deflate.load filter.load mpm_prefork.load php7.2.load ssl.load authn_file.load setenvif.load alias.load authz_core.load autoindex.load dir.load mime.load negotiation.load reqtimeout.load socache_shmcb.load status.load auth_basic.load authz_host.load env.load rewrite.load

# Set up deploy key
ssh-keygen -t rsa -b 4096 -C 'master deploy key'


# Clone repo
git clone git@github.com:jacobmischka/residentprogram.git /var/www/residentprogram
ln -s /var/www/residentprogram ~/residentprogram

chmod -R 775 /var/www/residentprogram
chown -R root:www-data /var/www/residentprogram

# Allow .htaccess override in /etc/apache2/apache2.conf
# Change `AllowOverride None` to `AllowOverride All` under `/var/www/`
# Make sure the rewrites in public/.htaccess are what you want them to be

# Make sure paths are right in apache2 site conf
cat > /etc/apache2/sites-available/residentprogram.conf <<EOF
<VirtualHost *:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin jmischka@mcw.edu
	DocumentRoot /var/www/residentprogram/public
	ServerName www.residentprogram.com

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog \${APACHE_LOG_DIR}/error.log
	CustomLog \${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
EOF

# Add domain to /etc/apache2/apache2.conf
echo 'ServerName www.residentprogram.com' >> /etc/apache2/apache2.conf

a2dissite 000-default.conf
a2ensite residentprogram.conf

apt install software-properties-common
add-apt-repository ppa:certbot/certbot
apt update
apt install python-certbot-apache

certbot --apache

# Create a swapfile if low-memory sever
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap defaults 0 0 ' >> /etc/fstab

# Init residentprogram
cd /var/www/residentprogram
# Create .env
composer install

# Create DB
mysql -u root -p
# create database residentprogram_laravel

php artisan migrate

yarn
yarn bower install --allow-root
./update.sh

# Init DB and storage files, either from dump or using artisan

