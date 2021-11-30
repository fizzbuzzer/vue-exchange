<template>
  <div class="view">
    <div class="view__box">
      <ViewExchangeBox
        :value="convertedValues['from']"
        :type="'from'"
        :initial="this.initial"
        @update="updateValue"
      />
    </div>
    <div class="view__rate-swap-box">
      <div class="view__rate">
        1 {{ from }} = {{ rate | monetary }} {{ to }}
      </div>
      <div class="view__swap">
        <button
          class="btn-swap"
          aria-label="Swap"
          @click="swapCurrencies"
        >
          <img
            src="@/assets/icons/swap.svg"
            role="presentation"
            class="btn-swap__icon"
          >
        </button>
      </div>
    </div>
    <div class="view__box">
      <ViewExchangeBox
        :value="convertedValues['to']"
        :type="'to'"
        :initial="this.initial"
        @update="updateValue"
      />
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ViewExchangeBox from './ViewExchangeBox.vue';

export default {
  name: 'ViewExchange',
  components: {
    ViewExchangeBox,
  },
  data() {
    return {
      initial: 'from',
      values: {
        from: 1,
        to: 1,
      },
    };
  },
  computed: {
    convertedValues() {
      return {
        from: this.initial === 'from' ? this.values.from : this.values.to / this.rate,
        to: this.initial === 'from' ? this.values.from * this.rate : this.values.to,
      };
    },
    ...mapGetters([
      'rate',
    ]),
    ...mapState([
      'from',
      'to',
      'currencies',
    ]),
  },
  watch: {
    from() {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('getRate');
    },
    updateValue(payload) {
      this.values[payload.type] = payload.value;
      this.initial = payload.type;
    },
    ...mapActions([
      'swapCurrencies',
    ]),
  },
};
</script>

<style scoped>
.view__rate-swap-box {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
}
.view__rate {
  font-size: 14px;
  color: #555;
}
.btn-swap {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.btn-swap__icon {
  width: 20px;
  height: 20px;
}
.btn-swap:focus {
  outline: 1px solid rgba(204, 204, 204, .3);
}
</style>
