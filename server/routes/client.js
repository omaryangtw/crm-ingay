const express = require('express');

const router = express.Router();
const ClientsController = require('../controllers/ClientController');

router.get('/', ClientsController.index);
router.get('/all', ClientsController.indexAll);
router.get('/backup', ClientsController.backup);
router.get('/householdadmin', ClientsController.householdadmin);
router.post('/', ClientsController.post);
router.put('/:clientId', ClientsController.put);
router.get('/:clientId', ClientsController.display);
router.delete('/:clientId', ClientsController.delete);
module.exports = router;
