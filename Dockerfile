FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python
COPY . .
RUN yarn

EXPOSE 3030
CMD ["yarn", "start"]
