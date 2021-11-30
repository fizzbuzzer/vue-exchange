<template>
  <div class="box">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]+([\.][0-9]+)?"
        :value="decoratedValue"
        class="box__input"
        @input="updateValue"
      >
      <select
        @change="changeCurrency($event, type)"
        class="box__select"
      >
        <option
          v-for="(value, key) in currencies"
          :key="key"
          :value="value"
          :selected="value === currency"
          class="box__option"
        >
          {{ value }}
        </option>
      </select>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ViewCostsBox',
  props: {
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    initial: {
      type: String,
      required: true,
    },
  },
  computed: {
    decoratedValue() {
      return this.isInitial ? this.value : this.$options.filters.monetary(this.value);
    },
    isInitial() {
      return this.initial === this.type;
    },
    ...mapGetters([
      'rate',
    ]),
    ...mapState({
      currency(state) {
        return state[this.type];
      },
    }),
    ...mapState([
      'currencies',
    ]),
  },
  methods: {
    changeCurrency(e, type) {
      this.$store.dispatch('changeCurrency', {
        currency: e.target.value,
        type,
      });
    },
    updateValue(e) {
      let value = +e.target.value;
      if (value <= 0) {
        value = 1;
        e.target.value = value;
      }

      this.$emit('update', {
        value,
        type: this.type,
      });
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  padding: 20px 25px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.box__input {
  min-width: 0;
  flex: 1 1;
  margin-right: 25px;
  background-color: transparent;
  font-size: 20px;
  border: none;
}
.box__input[readonly] {
  cursor: default;
  outline: none;
}
.box__select {
  flex: 0 1 80px;
  background-color: transparent;
  font-size: 24px;
  border: none;
}
.box__option {
  font-size: 16px;
}
.box__input:focus,
.box__select:focus
{
  outline: 1px solid rgba(204, 204, 204, .3);
}
</style>
