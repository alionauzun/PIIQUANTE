const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');

router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;
