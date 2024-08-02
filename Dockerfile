FROM ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

# Install curl
RUN apt-get install build-essential curl -y --allow-change-held-packages

# Install NPM
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update
RUN apt-get install nodejs -y --allow-change-held-packages

RUN node -v
RUN npm -v

WORKDIR /app
COPY . .

RUN npm install

EXPOSE $PORT

ENV HOSTNAME localhost

CMD ["npm", "start"]