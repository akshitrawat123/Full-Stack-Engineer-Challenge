FROM node:14-alpine

# Create app directory
WORKDIR /api

# Install app dependencies
COPY ./api/package.json ./
RUN npm install

# Bundle app source
COPY api/ .

# Build TypeScript
RUN npm run build

# Set environment variables
ENV PORT=3000
ENV MONGODB_URI=mongodb+srv://akshit:akshit@cluster0.uhcdy.mongodb.net/?retryWrites=true&w=majority

# Expose port and start the app
EXPOSE $PORT
CMD [ "npm", "start" ]
