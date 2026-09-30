FROM node:20-alpine AS test
WORKDIR /app
COPY package.json ./
COPY index.js index.test.js ./
RUN npm test

FROM node:20-alpine
WORKDIR /app
COPY --from=test /app/package.json /app/index.js ./
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "index.js"]