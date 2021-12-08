const express = require('express');

const router = express.Router();
const CaseController = require('../controllers/CaseController');

router.get('/', CaseController.index);
router.get('/backup', CaseController.backup);
router.get('/by-client/:clientId', CaseController.byClient);
router.post('/', CaseController.post);
router.put('/:caseId', CaseController.put);
router.get('/:caseId', CaseController.display);
router.delete('/:caseId', CaseController.delete);

module.exports = router;
