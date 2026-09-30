FROM php:8.2-cli

RUN docker-php-ext-install pdo pdo_sqlite

WORKDIR /app
COPY . /app

RUN mkdir -p /app/upload && chmod -R 777 /app/upload

CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8000} -t /app"]
