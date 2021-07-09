![Banner](./tools-banner.png)

# Wallet App: Web Server Application

Current web server application was built with RESTful architecture in mind.
The server allows to:

- create new users with email and password
- authenticate users
- get current user information

- create new transactions for income and/or expenses
- get all user's transactions and their total balance
- get statistics for certain period

## Documentation

The server provides endpoints to work with.
The endpoints are documented here:

:page_with_curl: [Wallet App API Documentation](https://awesome-wallet-app.herokuapp.com/api-docs/)

## Champions

:coffee: [Larisa](https://github.com/Larisa-Antsifrova)

:croissant: [Anna](https://github.com/Anna-Sokolova)

## Support Team

:pretzel: [Yaroslav](https://github.com/arestus)

:doughnut: [Dima](https://github.com/kramskiy-dima)

:cookie: [Anton](https://github.com/yaroshanton)

:cake: [Alex](https://github.com/AlexBelozertsev)

## Tools and resources

| Tool/Resource                                                          | Purpose                                                    |
| :--------------------------------------------------------------------- | :--------------------------------------------------------- |
| JS/ NodeJS                                                             | Primary project language                                   |
| [Express](https://expressjs.com/)                                      | Web application framework to build a server                |
| [helmet](https://www.npmjs.com/package/helmet)                         | Secures the server                                         |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Sets limits on the amount of requests to certain endpoints |
| [Joi](https://joi.dev/api/)                                            | Validates the incoming data/parameters                     |
| [Postman](https://www.postman.com/)                                    | Facilitates HTTP requests checks                           |
| [Axios](https://www.npmjs.com/package/axios)                           | Facilitates fetch requests to external services            |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)                     | Hashes passwords                                           |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)             | Generates, signs, verifies JWT access and refresh tokens   |
| [MongoDB](https://www.mongodb.com/)                                    | Primary database                                           |
| [Mongoose](https://mongoosejs.com/)                                    | MongoDB ODM for NodeJS                                     |
| [Swagger/OpenAPI](https://www.npmjs.com/package/swagger-ui-express)    | Used to generate server's documentation                    |
| [Nodemailer](https://nodemailer.com/about/)                            | Primary Email service                                      |
