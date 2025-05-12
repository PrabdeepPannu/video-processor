#!/bin/bash

echo "Starting saas-web..."

npm install
npm run build
npm run start:prod