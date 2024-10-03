const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.getCard = async (setName, cardName) => {
    const query = `${cardName} set:${setName}`;
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
    console.log(url)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        if (data.data.length > 0) {
            return data.data;
        } else {
            console.log("Aucune carte trouvée.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des informations de la carte:", error);
    }
}
