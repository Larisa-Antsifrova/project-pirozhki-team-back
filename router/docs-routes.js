const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const docsRoutes = Router();

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

docsRoutes.use('/api-docs', swaggerUi.serve);
docsRoutes.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = docsRoutes;
