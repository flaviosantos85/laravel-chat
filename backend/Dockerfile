FROM php:7.3-apache 

RUN apt update\
 && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer\
 && apt update && docker-php-ext-install mysqli pdo && docker-php-ext-enable mysqli

COPY . /var/www/html/backend

WORKDIR /var/www/html/backend

RUN composer install

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0