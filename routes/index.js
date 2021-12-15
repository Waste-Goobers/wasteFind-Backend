var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200);
  res.send({ name: 'wasteFind' });
});

/* TEST Backend Webservice Request */
router.get('/ping-web-service', async (req, res, next) => {
  try {
    const response = await axios.get('http://localhost:3002/');
    res.send(response.data);
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
