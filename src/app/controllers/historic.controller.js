const express = require('express');
const tokenMiddleware = require('../middlewares/token.middleware');
const Historic = require('../models/historic');

const router = express.Router();
router.use(tokenMiddleware);

router.post('/:company/:customer', async (req, res) => {
  const company = req.params.company;
  const customer = req.params.customer;
  const content = JSON.stringify(req.body);

  const historic = await Historic.create({ company, customer, content });

  res.send(historic);
});

router.get('/:company/:customer', async (req, res) => {
  const company = req.params.company;
  const customer = req.params.customer;

  await Historic.find({ company, customer }, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(results.map(result => JSON.parse(result.content)));
    }
  });
});

module.exports = app => app.use('/historics', router);
