### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:14.17.5-alpine as builder

RUN mkdir /react-app

WORKDIR /react-app

COPY . ./

RUN npm install
RUN npm run build:docker


### STAGE 2: Setup ###
FROM images.alm.site.sa/cytech/utils/nginx-1-14:0.1

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in build folder to default nginx public folder
COPY --from=builder /react-app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]