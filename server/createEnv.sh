#! /bin/bash -
# create the config from template
if [[ ! -e srv_config.json ]]; then
    cat srv_config.template.json > srv_config.json
fi
# setup mysql config
config=`cat srv_config.json`;
MYSQL_DATABASE="$(node -pe "JSON.parse(\`$config\`).DB_DBNAME")"
MYSQL_USER="$(node -pe "JSON.parse(\`$config\`).DB_USER")"
MYSQL_PASSWORD="$(node -pe "JSON.parse(\`$config\`).DB_PWD")"

# database setup
mysql -u ${MYSQL_USER} ${MYSQL_PASSWORD:+-p${MYSQL_PASSWORD}} --execute="CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}";
mysql -u ${MYSQL_USER} ${MYSQL_DATABASE} ${MYSQL_PASSWORD:+-p${MYSQL_PASSWORD}} < modules/db/db_template.sql

# install dependencies
npm install