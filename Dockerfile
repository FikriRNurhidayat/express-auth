FROM node:10.16

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8765

CMD npm start
