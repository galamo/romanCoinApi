
const api = {
    getCoins: () => {
        return $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list",
            method: "get"
        })
    },

    geMoreCoinInfo: (id) => {
        return $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${id}`,
            method: "get"
        })
    },

    multiCoins: (selectedCoins) => {
        return $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins}&tsyms=USD`,
            method: "get"
        })
    },
}


//Gal: Great Job
