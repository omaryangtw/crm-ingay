const express = require('express');

const router = express.Router();
const FamilyController = require('../controllers/FamilyController');

router.post('/', FamilyController.post);
router.delete('/:sourceId/:targetId', FamilyController.delete);
router.get('/', FamilyController.get);
router.get('/backup', FamilyController.get);

module.exports = router;
