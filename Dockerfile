# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG VITE_API_URL
ARG VITE_OPEN_WEATHER_MAP_API_KEY

# ENV VITE_API_URL=$VITE_API_URL
# ENV VITE_OPEN_WEATHER_MAP_API_KEY=$VITE_OPEN_WEATHER_MAP_API_KEY

RUN yarn build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
