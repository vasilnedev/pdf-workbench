#!/bin/bash
# This script opens an interacive shell in the Docker container 
# Usage: ./shell.sh

docker exec -it -w /usr/src/app pdf-workbench-server-1 bash