const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerDefinition.js');
const router = require('./routes/dataRoutes.js')
const cors = require('cors');
const { server_port, swagger_end_point, LA_API} = require("./config/config.js");
const compression = require("compression");

const app = express();

app.use(compression())

app.use(bodyParser.json());

app.use(cors());

app.get(`${LA_API}`, (req, res) => {
    res.send('API is running...');
  });

app.use(`${LA_API}`, router);

app.use(`${LA_API}${swagger_end_point}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(server_port, () => console.log(`Server running on port ${server_port}`));