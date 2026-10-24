# Stage 1: Build the React application
FROM node:22.23.4-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm audit fix
RUN npm audit fix --force

# Copy the rest of the application source code
COPY . .

# Build the application
RUN node node_modules/typescript/bin/tsc -b && npx vite build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
