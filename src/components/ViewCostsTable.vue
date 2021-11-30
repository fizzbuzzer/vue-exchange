<template>
  <table class="table">
    <thead>
      <tr>
        <th>{{ base }}</th>
        <th>{{ converted }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, index) in values"
        :key="index"
      >
        <td>{{ value }}</td>
        <td>{{ convert(value) | monetary }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ViewCostsTable',
  props: {
    base: {
      type: [String, null],
    },
    converted: {
      type: [String, null],
    },
  },
  data() {
    return {
      values: [1, 5, 10, 25, 50, 100, 500, 1000, 5000],
    };
  },
  computed: {
    ...mapGetters([
      'rate',
    ]),
    ...mapState([
      'from',
    ]),
  },
  methods: {
    convert(value) {
      const rate = this.base === this.from
        ? this.rate
        : 1 / this.rate;

      return value * rate;
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th {
  padding: 0 10px 12px;
}
.table th:first-child {
  text-align: left;
}
.table th:last-child {
  text-align: right;
}
.table tbody tr {
  border-top: 1px solid #ccc;
}
.table td {
  padding: 12px 10px;
}
.table td:nth-child(even) {
  text-align: right;
}
</style>
