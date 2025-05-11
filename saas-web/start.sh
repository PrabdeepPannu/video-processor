#!/bin/bash

echo "Starting saas-web..."

npm install
npx prisma generate

npm run build
npm run start:prod
