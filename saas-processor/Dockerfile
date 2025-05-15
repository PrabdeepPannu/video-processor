FROM node:18-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      curl && \
    npm install -g npm@9 && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get -y install procps

WORKDIR /opt/app

COPY . .

ENV PATH=/opt/app/node_modules/.bin:$PATH

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]