#!/bin/bash

# We wait for PostgreSQL in the docker-compose to be up and ready to accept connections
sleep 3

npm run prisma-init
npx prisma db seed
