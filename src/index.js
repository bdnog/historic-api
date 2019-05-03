const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/auth.controller')(app);
require('./app/controllers/historic.controller')(app);

const port = 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
