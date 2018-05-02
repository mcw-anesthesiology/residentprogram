#!/bin/bash

php artisan down

git checkout master
git pull origin master

yarn
yarn rebuild

php artisan up
