FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run prisma

COPY . .

CMD ["npm", "start"]