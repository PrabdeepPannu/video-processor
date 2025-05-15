#!/bin/bash

# Wait for PostgreSQL to be ready
until npx prisma db push; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

echo "PostgreSQL is ready!"

# Run migrations and seed the database
npx prisma migrate deploy
npx prisma db seed

echo "Database setup completed."
