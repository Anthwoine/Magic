const express = require('express');
const router = express.Router();

const { getAllCartes, getCarteById } = require('../controllers/carte.controller');


router.get('/all', getAllCartes);
router.get('/:id', getCarteById);


module.exports = router;