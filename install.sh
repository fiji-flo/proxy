#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
npm install
[ -e config.json ] || (echo config.json missing && exit 1)
PROXY_NODEJS=`which node` PROXY_DIR=$DIR envsubst < proxy.service.tmpl > proxy.service
sudo ln -s `realpath proxy.service` /etc/systemd/system/proxy.service
sudo systemctl daemon-reload
echo run:
echo   systemctl start proxy.service
echo start on boot with:
echo   systemctl enable proxy.service
