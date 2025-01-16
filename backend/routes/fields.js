const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getFields, createField } = require('../controllers/fieldController');

const router = express.Router();

router.post('/', protect, createField);

router.get('/', protect, getFields);

module.exports = router;