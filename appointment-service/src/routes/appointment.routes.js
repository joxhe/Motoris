const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appointment.controller');

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.patch('/:id/status', ctrl.updateStatus);

module.exports = router;