FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine as deploy
WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npm install --omit=dev
EXPOSE 3000/tcp
CMD ["node", "index.js"]
