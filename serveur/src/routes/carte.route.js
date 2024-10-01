const express = require('express');
const router = express.Router();

const { getAllCartes, getCarteById, changePrice, ajouteCarte } = require('../controllers/carte.controller');


router.get('/all', getAllCartes);
router.get('/:id', getCarteById);
router.put('/:id/change-price', changePrice);
router.post('/ajoute', ajouteCarte);




module.exports = router;