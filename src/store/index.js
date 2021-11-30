import Vue from 'vue';
import Vuex from 'vuex';
import ExchangeProvider from '../services/ExchangeProvider';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    from: null,
    to: null,
    currencies: {},
    rates: {},
    history: {},
  },
  mutations: {
    init(state, payload) {
      const { currencies } = payload;
      state.currencies = currencies;
    },
    changeCurrency(state, payload) {
      state[payload.type] = payload.currency;
    },
    updateRates(state, payload) {
      state.rates = payload;
    },
    updateHistory(state, payload) {
      state.history = payload;
    },
  },
  actions: {
    async init({ commit, dispatch }) {
      const currencies = await ExchangeProvider.getCurrencies();

      const [from, to] = currencies;

      commit('init', {
        currencies,
      });
      dispatch('changeCurrency', {
        type: 'from',
        currency: from,
      });
      dispatch('changeCurrency', {
        type: 'to',
        currency: to,
      });
    },
    async getRate({ commit, state }) {
      const currentRate = state.rates?.[state.from];

      if (currentRate !== undefined) {
        return;
      }

      const rates = await ExchangeProvider.getRate(state.from);

      commit('updateRates', {
        ...rates,
        ...state.rates,
      });
    },
    async getHistory({ commit, state }) {
      const currentHistory = state.history?.[state.from];

      if (currentHistory !== undefined) {
        return;
      }

      const history = await ExchangeProvider.getHistory(state.from);

      commit('updateHistory', {
        ...state.history,
        ...history,
      });
    },
    changeCurrency({ commit }, payload) {
      commit('changeCurrency', payload);
    },
    swapCurrencies({ dispatch, state }) {
      const { from, to } = state;
      dispatch('changeCurrency', {
        type: 'from',
        currency: to,
      });
      dispatch('changeCurrency', {
        type: 'to',
        currency: from,
      });
    },
  },
  getters: {
    rate(state) {
      return state.rates?.[state.from]?.[state.to] ?? 0;
    },
    rateHistory(state) {
      const res = {
        dates: [],
        rates: [],
      };

      const currentHistory = state.history[state.from];

      if (currentHistory === undefined) {
        return res;
      }
      Object.entries(currentHistory).forEach((entry) => {
        const [date, rates] = entry;
        res.dates.push(date);
        res.rates.push(rates[state.to]);
      });

      return res;
    },
  },
});
