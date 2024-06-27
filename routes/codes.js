const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

// GET route to generate a new code
router.get('/', codeController.generateCode);

// POST route to verify and use a code
router.post('/use', codeController.useCode);

module.exports = router;
