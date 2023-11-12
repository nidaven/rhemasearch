# Use the official Node.js image as the base image
FROM node:18.14.2-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

ENV WEAVIATE_URL=

# Build the Next.js app
RUN npm run build

# Expose the port the app will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]