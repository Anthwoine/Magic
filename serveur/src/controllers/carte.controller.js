
const Carte = require('../models/carte');
const {getCard} = require("../utils/scryfall");

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

module.exports.changePrice = async (req, res) => {
    console.log(req.body);
    const carte = await Carte.findByPk(req.params.id);
    if (!carte) {
        res.status(404).send('Carte non trouvée');
    } else if ((+req.body.price) <= 0) {
        res.status(400).send('Le prix ne peut pas être inférieur à 0');
    } else {
        carte.price_eur = req.body.price;
        await carte.save();
        res.status(200).json(carte);
    }
}

module.exports.ajouteCarte = async (req, res) => {
    try {
        console.log(req.body);
        const ext = req.body.ext;
        const nom = req.body.name;
        const newCard = {};
        const carte = await getCard(ext, nom);

        if (!carte) {
            res.status(404).send('Carte non trouvée');
            return;
        }

        newCard.name = carte[0].name;
        newCard.rarity = carte[0].rarity;
        newCard.set_name = carte[0].set_name;
        newCard.set_uri = carte[0].set_uri;
        newCard.price_eur = carte[0].prices.eur;
        newCard.mana_cost = carte[0].mana_cost;
        newCard.power = carte[0].power;
        newCard.toughness = carte[0].toughness;
        newCard.loyalty = carte[0].loyalty;
        newCard.type = carte[0].type_line;
        newCard.oracle_text = carte[0].oracle_text;
        newCard.image_uri = carte[0].image_uris.normal;
        newCard.colors = carte[0].colors.reduce((acc, color) => acc + color + ",", "");

        const createdCard = await Carte.create(newCard);

        res.status(201).json(createdCard);
    } catch (error) {
        res.status(500).send({
            "message": "Erreur lors de l'ajout de la carte",
            "erreur": error
        });
    }
};

module.exports.getFavoris = async (req, res) => {
    const cartes = await Carte.findAll({
        where: {
            favoris: true
        }
    });
    res.status(200).json(cartes);
}

module.exports.toggleFavoris = async (req, res) => {
    const carte = await Carte.findByPk(req.params.id);
    if (!carte) {
        res.status(404).send('Carte non trouvée');
    } else {
        carte.favoris = !carte.favoris;
        await carte.save();
        res.status(200).json(carte);
    }
}

