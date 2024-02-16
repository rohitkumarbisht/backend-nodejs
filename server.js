const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerDefinition.js');
const router = require('./routes/dataRoutes.js')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));