#!/bin/bash


# get our local IP address
MY_IP=`ifconfig en0 | grep "inet " | sed -Ee 's/.*inet ([\.0-9]+).*/\1/g'`
echo "Your IP address is ${MY_IP}"
export MY_IP


# start in the background
docker-compose up -d


echo
echo "You may need to update your /etc/hosts file to include point"
echo
echo "$IP    docs.freshvine.test"
echo " ------- "
echo
echo "You can connect from your development (host) machine to these services:"
echo "http://docs.freshvine.test:8090/"
echo