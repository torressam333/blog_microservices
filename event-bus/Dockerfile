# Base image
FROM node:alpine

# Output dir in container
WORKDIR /app

# CP only pkg json to prevent unnecessary copying of all files
COPY ./package.json ./

# Install deps
RUN npm install

# Copy over remaining source code
COPY ./ ./

# What to do when container is copied
CMD ["npm", "start"]


