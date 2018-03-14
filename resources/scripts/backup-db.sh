#!/bin/sh

DATE=$(date +%F_%H-%M)

# FIXME: Remove these from this file when I have more time
DB_DATABASE="residentprogram_laravel"
DB_USERNAME="root"
DB_PASSWORD="*Yj~9I9&(FYco)a9"

BOX_USERNAME=jmischka@mcw.edu
BOX_EXTERNAL_PASSWORD=98sNU9FJTXFXIdFu
BOX_DIRECTORY=residentprogram-backups

DB_BACKUP_DIRECTORY=db
BACKUP_FILENAME=$DATE.db

mysqldump $DATABASE --user="$DB_USERNAME" --password="$DB_PASSWORD" $DB_DATABASE | curl -1 --ftp-ssl --disable-epsv --ftp-skip-pasv-ip -u $BOX_USERNAME:$BOX_EXTERNAL_PASSWORD --upload-file /dev/stdin ftp://ftp.box.com/$BOX_DIRECTORY/$DB_BACKUP_DIRECTORY/$BACKUP_FILENAME
