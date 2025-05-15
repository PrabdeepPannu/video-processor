# Use a compatible version of Node.js
FROM node:20

# Install procps to avoid crashes on reload
RUN apt-get update && apt-get -y install procps

# Default port for NestJS
EXPOSE 3003

# Set the working directory
WORKDIR /opt/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Add node_modules bin to the path
ENV PATH=/opt/app/node_modules/.bin:$PATH