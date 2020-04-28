FROM nginx:1.15.12-alpine

COPY --from=540682145059.dkr.ecr.us-west-2.amazonaws.com/linumlabs/anglo-rpp/build/builder:latest /build/webapp/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=540682145059.dkr.ecr.us-west-2.amazonaws.com/linumlabs/anglo-rpp/build/builder:latest /build/webapp/build .

EXPOSE 80
