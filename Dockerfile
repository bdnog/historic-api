FROM node

ENV APP_DIR /var/app

RUN mkdir -p $APP_DIR

COPY . $APP_DIR

WORKDIR $APP_DIR

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]
