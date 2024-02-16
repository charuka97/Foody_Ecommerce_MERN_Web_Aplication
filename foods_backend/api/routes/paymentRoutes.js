const express = require('express')
const router = express.Router();

const paymentController = require('../controllers/paymentController.js');
const verifyToken = require('../middleware/verifyToken.js')

router.post('/', verifyToken, paymentController.postPaymentItem);
router.get('/',verifyToken, paymentController.getAllPaymentRequest);

module.exports = router;