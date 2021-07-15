const axios = require('axios');

class CurrencyService {
  async fetchCurrencies() {
    try {
      const { data } = await axios.get(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new CurrencyService();
