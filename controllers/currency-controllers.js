const CurrencyService = require('../services/currency-service');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');

class CurrencyControllers {
  async getCurrencies(req, res, next) {
    try {
      const response = await CurrencyService.fetchCurrencies();
      const rates = response.filter(currency => currency.ccy !== 'BTC');

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: rates
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CurrencyControllers();
