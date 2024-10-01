async function fetchManaSymbols() {
    const response = await fetch('https://api.scryfall.com/symbology');
    const data = await response.json();

    return data.data.reduce((acc, symbolData) => {
        acc[symbolData.symbol] = symbolData.svg_uri;
        return acc;
    }, {});
}
export default fetchManaSymbols;





