#!/bin/bash
set -e

display_help() {
  printf "usage: cus.sh [command]\n\n"
  printf "commands:\n"
  printf "init\n\tSet up the directory so that the Docker environment can be created with other commands.\n"
  printf "up\n\tBring up all services.\n"
  printf "upb\n\tBring up all services, rebuilding each Docker image.\n"
  printf "down\n\tBring down the services.\n"
  printf "downv\n\tBring down the services and their volumes.\n"
}

case "$1" in
  init) # Set up the directory so that the Docker environment can be created with other commands.
    cd custom-url-shortener-backend
    yarn install
    cd ..

    cd custom-url-shortener-frontend
    yarn install
    cd ..
  ;;

  up) # Bring up all services.
    docker-compose up --abort-on-container-exit
  ;;

  upb) # Bring up all services, rebuilding each Docker image.
    docker-compose up --abort-on-container-exit --build
  ;;

  down) # Bring down the services.
    docker-compose down
  ;;

  downv) # Bring down the services and their volumes.
    docker-compose down -v
  ;;

  help)
    display_help
  ;;

  "")
    display_help
  ;;

  *)
    echo "Invalid argument $1"
    display_help
esac