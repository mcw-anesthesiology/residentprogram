#!/bin/sh

DATE=$(date +%F_%H-%M)

BASE_DIRECTORY=/var/www/residentprogram
STORAGE_DIRECTORY="$BASE_DIRECTORY/storage/app"
FORM_DIRECTORY=evaluation_forms
PHOTO_DIRECTORY=photos

BACKUP_FORM_FILENAME="$DATE.tar.gz"
BACKUP_PHOTO_FILENAME="$DATE.tar.gz"

BOX_USERNAME=jmischka@mcw.edu
BOX_EXTERNAL_PASSWORD=98sNU9FJTXFXIdFu
BOX_DIRECTORY=residentprogram-backups

cd $STORAGE_DIRECTORY

tar -cz $FORM_DIRECTORY | curl -1 --disable-epsv --ftp-ssl --ftp-skip-pasv-ip -u $BOX_USERNAME:$BOX_EXTERNAL_PASSWORD --upload-file /dev/stdin ftp://ftp.box.com/$BOX_DIRECTORY/$FORM_DIRECTORY/$BACKUP_FORM_FILENAME
tar -cz $PHOTO_DIRECTORY | curl -1 --disable-epsv --ftp-ssl --ftp-skip-pasv-ip -u $BOX_USERNAME:$BOX_EXTERNAL_PASSWORD --upload-file /dev/stdin ftp://ftp.box.com/$BOX_DIRECTORY/$PHOTO_DIRECTORY/$BACKUP_PHOTO_FILENAME
