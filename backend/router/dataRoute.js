const express = require('express');
const router = express.Router();
const dataController = require('../controllers/getDataController'); 

router.get('/', dataController.getData);
router.get('/query', dataController.getDataByQuery);


module.exports = router;        