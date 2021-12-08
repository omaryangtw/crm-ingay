const express = require('express');

const router = express.Router();
const ContactController = require('../controllers/ContactController');

router.post('/', ContactController.post);
router.delete('/:clientId/:contactId', ContactController.delete);
router.patch('/:contactId', ContactController.update);
router.get('/', ContactController.index);
router.get('/backup', ContactController.backup);
module.exports = router;
