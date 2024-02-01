FROM node:14 AS builder

WORKDIR /auth-api
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine

WORKDIR /auth-api
COPY --from=builder /auth-api/dist ./dist
COPY --from=builder /auth-api/node_modules ./node_modules
COPY --from=builder /auth-api/package*.json ./

CMD npm start