FROM node:lts-alpine
WORKDIR /node-app
COPY "package.json" .
RUN npm install
COPY . .
CMD ["npm", "start"]
