docker-compose stop &&
git stash &&
git pull &&
docker-compose up --build -d &&
sleep 5 &&
docker-compose logs
