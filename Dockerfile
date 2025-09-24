# Use official Node.js LTS 20 as base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the project code to container
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]
