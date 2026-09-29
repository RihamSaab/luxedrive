FROM php:8.2-cli

RUN docker-php-ext-install pdo pdo_sqlite

WORKDIR /app
COPY . /app

RUN mkdir -p /app/data/upload \
    && rm -rf /app/upload \
    && ln -s /app/data/upload /app/upload \
    && chmod -R 777 /app/data

CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8000} -t /app"]
