// src/docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../swaggerDef');


const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js', 'src/controllers/*.js'], // path relatif dari root project
};

const swaggerSpec = swaggerJSDoc(options);


function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/swagger.json', (req, res) => res.json(swaggerSpec));
}

module.exports = setupSwagger;
