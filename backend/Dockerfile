FROM php:8.2-cli

RUN docker-php-ext-install pdo pdo_sqlite

WORKDIR /app
COPY . /app

RUN rm -rf /app/upload && ln -s /app/data/upload /app/upload

CMD ["sh", "-c", "mkdir -p /app/data/upload && chmod -R 777 /app/data && php -S 0.0.0.0:${PORT:-8000} -t /app"]
