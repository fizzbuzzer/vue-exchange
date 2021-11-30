<template>
  <div class="tables">
    <div class="tables__item">
      <ViewCostsTable
        :base="from"
        :converted="to"
      >
      </ViewCostsTable>
    </div>
    <div class="tables__item">
      <ViewCostsTable
        :base="to"
        :converted="from"
      >
      </ViewCostsTable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ViewCostsTable from './ViewCostsTable.vue';

export default {
  name: 'ViewCosts',
  components: {
    ViewCostsTable,
  },
  computed: {
    ...mapState([
      'from',
      'to',
    ]),
  },
};
</script>

<style scoped>

.tables__item {
  margin-bottom: 30px;
}

.tables__item:last-child {
  margin-bottom: 0;
}

@media screen and (min-width: 768px) {
  .tables {
    display: flex;
    justify-content: space-between;
  }
  .tables__item {
  flex: 1 1;
  margin-bottom: 0;
  padding-right: 15px;
}
.tables__item:last-child {
  padding-right: 0;
}
}
</style>
