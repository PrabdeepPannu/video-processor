FROM node:18-alpine
WORKDIR /usr/src/app

# Only one copy of package*.json is needed
COPY package*.json ./
RUN npm install

COPY . .

# Ensure react-scripts listens on 8080
ENV PORT=8080

# Install curl (optional)
RUN apk add --no-cache curl

EXPOSE 8080
CMD ["npm", "start"]
