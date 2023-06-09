FROM node:16.14.0-alpine3.14 as config-builder

WORKDIR /app

ARG API_URL=${API_URL}
ENV API_URL=${API_URL}

COPY config.js .
COPY src/assets/config.json ./src/assets/config.json
RUN node config.js


# Use an official Node.js runtime as a parent image
FROM node:16.14.0-alpine3.14 as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci


# Copy the rest of the application code to the working directory
COPY . .
COPY --from=config-builder /app/src/assets/config.json ./src/assets/config.json

# Build the Angular app
RUN npm run build --configuration=production

# Use a smaller, lightweight base image for serving
FROM nginx:1.21.3-alpine


# Copy the built Angular app from the previous stage
COPY --from=builder /app/dist/accelerator-app /usr/share/nginx/html

ADD default.conf /etc/nginx/conf.d/

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
