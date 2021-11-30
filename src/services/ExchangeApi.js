import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.exchangerate.host',
});

const responseInterceptor = (response) => {
  if (response.status === 200) {
    return response.data;
  }
  throw Error(response.stattusText);
};

const errorInterceptor = (error) => {
  console.error('error', error);

  return error;
};

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

class API {
  static getCurrencies() {
    return instance.get('/symbols').then((res) => (res.success === true ? res.symbols : {}));
  }

  static getRate(base) {
    return instance
      .get('/rates', {
        params: {
          base,
        },
      })
      .then((res) => {
        const { rates } = res;
        return {
          [base]: rates,
        };
      });
  }

  static getHistory(base, startDate, endDate) {
    return instance
      .get('/timeseries', {
        params: {
          base,
          start_date: startDate,
          end_date: endDate,
        },
      })
      .then((res) => {
        const { rates } = res;
        return {
          [base]: rates,
        };
      });
  }
}

export default API;
