#!/bin/bash
container_id=$(docker ps -a | grep "learning-analytics-api" | awk '{print $1}')
if [[ "$container_id" != "" ]]
then
        docker stop $container_id
        docker rm $container_id
else
        echo "No container present"
fi

image_id=$(docker images | grep "learning-analytics-api" | awk '{print $3}')
if [[ "$image_id" != "" ]]
then
        docker rmi -f $image_id
else
        echo "No image present"
fi
