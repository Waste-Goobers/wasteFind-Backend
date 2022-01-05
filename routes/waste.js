const express = require('express');
const multer = require('multer');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const middleware = require('../middleware/user.middleware');
const admin = require('../config/firebase-config');
const { FieldValue } = require('firebase-admin/firestore');
var jwt = require('jsonwebtoken');

/**
 * Test endpoint for is webservice alive
 * @request GET
 * @response pong
 */
router.get('/ping', middleware.decodeToken, async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/ping');
    res.send(response.data);
  } catch (error) {
    res.send({ error: error });
  }
});

/**
 * Transfers uploaded image through webservice and adds recycle history to user
 * @request POST
 * @response predicted material type
 */
router.post(
  '/photo-upload',
  middleware.decodeToken,
  multer({ storage: multer.memoryStorage() }).single('file'),
  async (req, res) => {
    if (req.file) {
      try {
        // Transfers uploaded image through webservice
        const form = new FormData();
        form.append('file', req.file.buffer, {
          contentType: req.file.mimetype,
          filename: req.file.originalname,
        });

        const material_res = await axios.post(
          'http://127.0.0.1:5000/predict-api',
          form,
          {
            headers: {
              ...form.getHeaders(),
              auth: process.env.HEADER_KEY,
            },
          }
        );
        // adds recycle history to user
        const decoded = jwt.decode(req.headers.authorization?.split(' ')[1]);
        const history = {
          material: material_res.data,
          user_id: decoded.user_id,
          date: new Date(),
        };

        await admin
          .firestore()
          .collection('users')
          .doc(decoded.user_id)
          .update({ scanHistory: FieldValue.arrayUnion(history) });

        res.status(200).send({
          message: 'Success',
          material: material_res.data,
          history: history,
        });
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
    } else {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
  }
);

module.exports = router;
