#!/bin/bash

# We wait for PostgreSQL in the docker-compose to be up and ready to accept connections
sleep 5

echo "PostgreSQL is ready!"

npm run prisma-init

npx prisma db seed

echo "Database setup completed."
