import moment from 'moment';
import API from './ExchangeApi';

const POPULAR_CURRENCIES = ['USD', 'RUB', 'EUR'];
const DATE_FORMAT = 'YYYY-MM-DD';

class ExchangeProvider {
  static async getCurrencies() {
    let currencies = JSON.parse(localStorage.getItem('currencies'));
    if (currencies === null) {
      currencies = await API.getCurrencies();

      currencies = [...new Set([
        ...POPULAR_CURRENCIES,
        ...Object.keys(currencies),
      ])];

      localStorage.setItem('currencies', JSON.stringify(currencies));
    }
    return currencies;
  }

  static getRate(currency) {
    return API.getRate(currency);
  }

  static getHistory(currency) {
    const startDate = moment().subtract(10, 'days').format(DATE_FORMAT);
    const endDate = moment().format(DATE_FORMAT);
    return API.getHistory(currency, startDate, endDate);
  }
}

export default ExchangeProvider;
