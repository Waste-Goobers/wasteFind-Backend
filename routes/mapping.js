var express = require('express');
const axios = require('axios');
const mappingController = require('../controllers/mapping.controller');
var router = express.Router();
const middleware = require('../middleware/user.middleware');

/**
 * Find Near Recycle Centers By Zipcode
 * @body { "zipcode":"06370" }
 * @returns  obj { recycle_centers:[] }
 */
router.post('/zipcode', middleware.decodeToken, (req, res, next) => {
  try {
    if (req.body.zipcode) {
      res.send({
        recycle_centers: mappingController.calculateByZipcode(req.body.zipcode),
      });
    }
  } catch (e) {
    console.error(e);
    res.status(406).send('Wrong or Missing Zipcode Try again');
  }
});

/**
 * Find Near Recycle Centers By Location
 * @body { "location":{ "lat": -33.8599358, "lng": 151.2090295 }}
 * @returns arr { recycle_centers:[] }
 */
router.post('/location', middleware.decodeToken, (req, res, next) => {
  try {
    if (req.body.location) {
      res.send({
        recycle_centers: mappingController.calculateByLocation(
          req.body.location,
          req.body.type
        ),
      });
    }
  } catch (e) {
    res.status(406);
    res.send('Wrong or Missing Zipcode Try again');
  }
});

module.exports = router;
