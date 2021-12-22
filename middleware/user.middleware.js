const admin = require('../config/firebase-config');

class Middleware {
  /**
   * Verify request header jwt with firebase function
   */

  async decodeToken(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization?.split(' ')[1];

      try {
        const decodeValue = await admin.auth().verifyIdToken(token);

        if (decodeValue) {
          return next();
        }
        return res.status(401).send({
          message: 'Unauthorized request, You have no permission to do that!',
        });
      } catch (e) {
        return res.status(500).send({
          message: 'Internal Server Error',
        });
      }
    } else {
      console.log(process.env.FB_PROJECT_NAME);
      return res.status(401).send({
        message: 'Unauthorized request, Request must have headers to do that!',
      });
    }
  }
}

module.exports = new Middleware();
