#!/bin/bash

echo "Step 1. Pull Docker images..."
docker image pull node

echo "Step 2. Install node modules..."
docker run -v $(pwd):/usr/src/app -w /usr/src/app node npm install

echo "Step 3. Starting Docker containers..."
docker compose up -d

echo "To access the Docker container run ./shell.sh"
echo "To stop the Docker container run docker compose down"
