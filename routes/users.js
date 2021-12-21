var express = require('express');
var router = express.Router();
const middleware = require('../middleware/user.middleware');

/* GET users listing. */
router.get('/test-auth', middleware.decodeToken, function (req, res, next) {
  res.send('This message required a token to see');
});

module.exports = router;
