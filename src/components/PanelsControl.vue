<template>
  <div class="control">
    <div class="control__item">
      <input
        id="costs"
        type="checkbox"
        :checked="isVisible.costs"
        @change="updateVisibility('costs')"
      />
        <label for="costs" class="control__label">
          Show costs table
        </label>
    </div>
    <div class="control__item">
      <input
        id="history"
        type="checkbox"
        :checked="isVisible.history"
        @change="updateVisibility('history')"
      />
      <label for="history" class="control__label">
        Show history chart
      </label>
    </div>
    <p class="control__footer">
      Data provider <a href="https://exchangerate.host" target="_blank" rel="noopener">exchangerate.host</a> ❤️
    </p>
  </div>
</template>

<script>
export default {
  name: 'PanelsControl',
  props: {
    isVisible: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateVisibility(panel) {
      this.$emit('update', {
        panel,
        value: !this.isVisible[panel],
      });
    },
  },
};
</script>

<style scoped>
.control {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.control__item {
  margin-bottom: 8px;
}
.control__label {
  font-size: 16px;
  cursor: pointer;
}
.control__footer {
  margin-top: auto;
  margin-bottom: 0;
  font-size: 14px;
}

@media screen and (min-width: 600px) {
  .control__item {
    margin-bottom: 10px;
  }
  .control__label {
    font-size: 18px;
  }
}

</style>
