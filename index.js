require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const boolParser = require('express-query-boolean');
const cookieParser = require('cookie-parser');

const db = require('./db/mongo-db');
const { Limits } = require('./config/limits');
const HttpCodes = require('./helpers/http-codes');
const Ports = require('./helpers/ports');
const Statuses = require('./helpers/statuses');
const Messages = require('./helpers/messages');

const authRoutes = require('./router/auth-routes');
const categoriesRoutes = require('./router/categories-routes');
const statisticsRoutes = require('./router/statistics-routes');
const transactionsRoutes = require('./router/transactions-routes');
const userRoutes = require('./router/user-routes');
const currencyRoutes = require('./router/currency-routes');
const docsRoutes = require('./router/docs-routes');

const PORT = process.env.PORT || Ports.DEFAULT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: Limits.JSON }));
app.use(boolParser());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/user', userRoutes);
app.use('/currency', currencyRoutes);
app.use('/api-docs', docsRoutes);

// Simple redirect to documentation
app.use('/', (req, res, next) => {
  return res.redirect(HttpCodes.OK, '/api-docs');
});

// Handling 404 Not found
app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({
    status: Statuses.ERROR,
    code: HttpCodes.NOT_FOUND,
    message: Messages.NOT_FOUND
  });
});

// Central errors handling
app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status:
      statusCode === HttpCodes.INTERNAL_SERVER_ERROR
        ? Statuses.FAIL
        : Statuses.ERROR,
    code: statusCode,
    message: err.message
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const startServer = async () => {
  try {
    await db;
    app.listen(PORT, () => console.log('Server running on port: ', PORT));
  } catch (error) {
    console.log('Error in startServer: ', error.message);
  }
};

startServer();

module.exports = app;
