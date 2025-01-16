const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createForm, updateForm, getFormDetails, fetchFormsWithPagination } = require('../controllers/formController');

const router = express.Router();

router.post('/', protect, createForm);

router.put('/:formId', protect, updateForm)

router.get('/', protect, fetchFormsWithPagination)

router.get('/:formId', getFormDetails);


module.exports = router;