docker-compose up

yarn install:aggregation
yarn start:dev:aggregation

yarn install:sso
yarn start:dev:sso
yarn workspace @apps/sso-service migration:run

yarn install:booking
yarn start:dev:booking
yarn workspace @apps/booking-service migration:run