const express = require("express");
const upload = require('../utils/multer');
const { submitForm } = require("../controllers/formSubmit");

const router = express.Router();

router.post("/:formId", upload.any(), submitForm);

module.exports = router;
