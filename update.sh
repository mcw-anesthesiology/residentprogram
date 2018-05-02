#!/bin/bash

php artisan down

git checkout master
git pull origin master

composer install

yarn
yarn rebuild

php artisan up
