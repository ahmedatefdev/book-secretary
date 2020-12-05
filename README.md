# Book Secretary

**REST-API** uses authentication token to create, update, and delete any data from storage.
for _**guest**_ user can read only the public books but the _**authenticated**_ users can read the private books if they have any.
The **registered** user can display his books with the public and add books for public or private with the ability to **update** and **deletion** for his books.

## Running Locally

```bash
$ git clone https://github.com/ahmedatefdev/book-secretary.git
$ cd book-secretary
```

## Add env file

Create a `/config/development.env` file and add to it the coming vars

- MONGODB_URL="DATABASE_URL"
- EXPIRE_IN="TIME_THAT_TOKEN_EXPIRE_IN"
- JWT_SECRET="RANDOM_SECRET_FOR_TOKEN"
- JWT_SECRET_RESET="RANDOM_SECRET_FOR_REST_TOKEN"

> Then use the coming commends in terminal

```bash
$ yarn
$ yarn start
```

## Built Using

- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [PassportJS](http://www.passportjs.org/)
- [Swagger](https://swagger.io/)
