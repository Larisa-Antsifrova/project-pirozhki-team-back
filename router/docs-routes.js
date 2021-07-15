const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const docsRoutes = Router();

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

docsRoutes.use('/', swaggerUi.serve);
docsRoutes.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = docsRoutes;
