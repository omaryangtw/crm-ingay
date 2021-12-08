const express = require('express');

const router = express.Router();
const ContactController = require('../controllers/ContactController');

router.post('/', (req, res) => {
  ContactController.post(req, res);
});
router.delete('/:clientId/:contactId', (req, res) => {
  ContactController.delete(req, res);
});
router.patch('/:contactId', ContactController.update);
router.get('/', ContactController.index);
router.get('/backup', ContactController.backup);
module.exports = router;
