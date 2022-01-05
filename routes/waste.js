const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const middleware = require('../middleware/user.middleware');

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
 * Transfers uploaded image through webservice and TODO: adds recycle history to user
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
        // TODO handle recycle history here

        res.status(200).send({
          message: 'Success',
          material: material_res.data,
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
