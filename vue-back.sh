#! /bin/bash
WORK_PATH='/usr/projects/vue-back'
cd $WORK_PATH
echo "先清除老代码"
git reset --hard origin/master
git clean -f
echo "拉取最新代码"
git pull origin master
echo "开始执行构建"
docker build -t vue-back:1.0 .
echo "停止并删除就容器"
docker stop vue-back-container
docker rm vue-back-container
echo "启动新容器"
docker container run -p 5000:5000 --name vue-back-container -d vue-back:1.0