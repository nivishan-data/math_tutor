# frontend/Dockerfile
# Use official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean install dependencies with no package-lock
RUN npm clean-install --no-package-lock

# Copy the rest of the application code
COPY . .

# Build the React app (CI=false prevents treating warnings as errors)
ENV CI=false
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
