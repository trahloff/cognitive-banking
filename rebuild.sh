docker-compose down &&
git stash &&
git pull &&
docker-compose up --build -d &&
sleep 15 &&
docker-compose logs
