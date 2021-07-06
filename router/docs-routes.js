const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const docsRoutes = Router();

docsRoutes.use('/api-docs', swaggerUi.serve);
docsRoutes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = docsRoutes;
