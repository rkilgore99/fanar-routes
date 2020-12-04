FROM node:10.15.3-alpine
WORKDIR /usr/app/template-service
COPY . /usr/app/template-service

RUN npm install && \
  npm run build && \
  rm -rf node_modules src

FROM node:10.15.3-alpine
WORKDIR /usr/app/template-service
COPY --from=0 /usr/app/template-service .

RUN npm install --production --no-optional && \
  npm dedupe && \
  npm cache clear --force

EXPOSE 8050

CMD ["npm", "run", "start"]
