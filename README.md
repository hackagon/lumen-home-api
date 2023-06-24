# Lumen - Booking Room App

This repository contains the source code and documentation for the Lumen Booking Room application. The Lumen app allows users to book rooms and manage their bookings. It is built using NestJS and follows a clean architecture design pattern.

## Tech Stack

The Lumen app is built using the following technologies:

- NestJS
- PostgreSQL
- TypeORM
- TypeScript
- Microservices with Kafka
- Docker & Docker Compose

## Architecture

The Lumen app follows a NestJS monorepo architecture and adheres to clean architecture principles. It consists of the following microservices:

1. **Aggregation Service** - Serves as the API gateway for the application.
2. **SSO Service** - Provides user registration and login functionality.
3. **Booking Service** - Handles room booking operations.

## Docker Containers

The Docker containers included in this project are:

- **Database** - PostgreSQL and Adminer (Database UI accessible at http://localhost:8080)
- **Kafka** & **Redpanda** - Kafka with a GUI (accessible at http://localhost:8082)
- **Services** - Aggregation, SSO, and Booking services

The Aggregation service can be accessed at http://localhost:16001 when running using Docker Compose.

## Postman

The following Postman resources are available for testing the API:

- **API Documentation**: [Link to Postman Documenter](https://documenter.getpostman.com/view/3254527/2s93z6dj24)
- **Postman Collection**: [Link to Postman Collection](https://api.postman.com/collections/3254527-93084110-81b0-489d-bec7-322bf32daf16?access_key=PMAT-01H3PZ4AC123TGQ7C64RZGYCJ2)

## System Design

For a visual representation of the microservice architecture and database design, refer to the following diagrams:

- **Microservice Architecture**: [Link to Microservice Architecture Diagram](https://github.com/hackagon/lumen-home-test/blob/main/docs/microservice_design.png)
- **Database Design**: [Link to Database Design Diagram](https://github.com/hackagon/lumen-home-test/blob/main/docs/database_design.png)

## Getting Started

To run the Lumen app, follow these steps:

1. Clone this repository.
2. Run `docker-compose up` to start the Docker containers.
3. Import the SQL file into your PostgreSQL database.

## Testing the API

Before testing the API, make sure to set the environment variable `API_HOST` to `localhost:16001`.

Follow the steps below to test the API using cURL commands:

1. Call the API health check:

```bash
curl --location '{{API_HOST}}/api/health'
```

2. Call the API login to get the JSON Web Token (JWT):

```bash
curl --location '{{API_HOST}}/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "phonghiavan@gmail.com",
    "password": "hackagon"
}'
```

3. Call the API to get a list of available rooms (no authentication required):

```bash
curl --location '{{API_HOST}}/api/booking/available-rooms?desiredDate=25-06-2023&page=1&limit=2'
```

4. Call the API to make a booking:

```bash
curl --location '{{API_HOST}}/api/booking' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data '{
    "

bookings": [
        {
            "roomId": 1,
            "startDate": "01-10-2023",
            "endDate": "01-11-2023"
        },
        {
            "roomId": 2,
            "startDate": "01-08-2023",
            "endDate": "01-09-2023"
        }
    ]
}'
```

Make sure to replace `{{API_HOST}}` with the appropriate value and `{{token}}` with the JWT obtained from the login API.

That's it! You are now ready to use the Lumen Booking Room app.

If you have any questions or need further assistance, please feel free to contact us.
