const express = require('express');
const router = express.Router();
const MpesaController = require('../controllers/mpesa.controller');

router.post('/stk', MpesaController.stkPush);
router.post('/callback', MpesaController.callback);
router.post('/withdraw', MpesaController.withdraw);
router.get('/user/:phone', MpesaController.getUser);
router.get('/transaction/:phone', MpesaController.getLatestTransaction);
router.get('/auth-test', MpesaController.authTest);

module.exports = router;
