const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inventory.controller');

router.post('/', ctrl.addPart);
router.get('/', ctrl.getAll);
router.patch('/:id/stock', ctrl.updateStock);

module.exports = router;