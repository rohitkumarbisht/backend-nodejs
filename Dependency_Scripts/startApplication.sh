#!/bin/bash
dir=$(dirname "$0")
version=$(cat ${dir}/../buildNumber.txt)

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 619942913628.dkr.ecr.ap-south-1.amazonaws.com
docker pull 619942913628.dkr.ecr.ap-south-1.amazonaws.com/dev-accelerators:learning-analytics-api-$version
docker run -d -p 5000:5000 --name learning-analytics-api 619942913628.dkr.ecr.ap-south-1.amazonaws.com/dev-accelerators:learning-analytics-api-$version
sleep 10
