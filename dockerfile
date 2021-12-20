FROM node:14.16.0-alpine3.10
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY .  .
EXPOSE 3000
CMD ["node", "index.js"]