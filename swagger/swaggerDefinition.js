const swaggerJsdoc = require('swagger-jsdoc');
const swagger_doc = require('./swagger_doc.js')

const options = {
  definition: swagger_doc,
  apis: ['../server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
