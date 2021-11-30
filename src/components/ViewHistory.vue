<template>
  <div>
    <ViewHistoryChart :chart-data="chartData"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ViewHistoryChart from './ViewHistoryChart.vue';

export default {
  name: 'ViewHistory',
  components: {
    ViewHistoryChart,
  },
  computed: {
    chartData() {
      return {
        labels: this.rateHistory.dates,
        datasets: [{
          data: this.rateHistory.rates,
          backgroundColor: 'transparent',
          borderColor: 'green',
          borderWidth: 1,
        }],
      };
    },
    ...mapGetters([
      'rateHistory',
    ]),
    ...mapState([
      'from',
      'to',
    ]),
  },
  watch: {
    from() {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('getHistory');
    },
  },
};
</script>
