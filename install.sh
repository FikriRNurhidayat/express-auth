docker-compose down
docker container stop $(docker container ls -a -q)
docker rmi $(docker image ls -a -q)
docker pull fikrirnurhidayat/express-auth:latest
docker-compose up
