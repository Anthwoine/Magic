
const Carte = require('../models/carte');

module.exports.getAllCartes = async (req, res) => {
    const cartes = await Carte.findAll();
    res.status(200).json(cartes);
};

module.exports.getCarteById = async (req, res) => {
    const carte = await Carte.findByPk(req.params.id);
    if (!carte) {
        res.status(404).send('Carte non trouvée');
    } else {
        res.status(200).json(carte);
    }
}
