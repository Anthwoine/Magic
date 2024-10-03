const express = require('express');
const router = express.Router();

const { getAllCartes, getCarteById, changePrice, ajouteCarte, getFavoris, toggleFavoris } = require('../controllers/carte.controller');


router.get('/all', getAllCartes);

router.get('/favoris', getFavoris);

router.get('/:id/by-id', getCarteById);
router.put('/:id/change-price', changePrice);
router.put('/:id/toggle-favoris', toggleFavoris);


router.post('/ajoute', ajouteCarte);





module.exports = router;