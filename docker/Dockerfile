FROM node:14.15.3-alpine3.10

ENV NODE_ENV development

WORKDIR "/app"

COPY ./package*.json ./

RUN npm install

COPY .next/ .
COPY config/ .

# TODO expose database arguments (preferabbly DATABASE_URL) 
# TODO 

CMD ["npm", "run", "dev"]
