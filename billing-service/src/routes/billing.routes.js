const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/billing.controller');

router.post('/', ctrl.createInvoice);
router.get('/', ctrl.getAll);
router.patch('/:id/pay', ctrl.payInvoice);

module.exports = router;