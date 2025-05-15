# saas-client/Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Install curl using apk
RUN apk add --no-cache curl
EXPOSE 8080
CMD ["npm", "start"]