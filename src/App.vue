<template>
  <div id="app">
    <div class="layout">
      <div class="layout__exchange">
        <PanelItem>
          <ViewExchange/>
        </PanelItem>
      </div>
      <div class="layout__costs" v-if="isVisible.costs">
        <PanelItem>
          <ViewCosts/>
        </PanelItem>
      </div>
      <div class="layout__history" v-if="isVisible.history">
        <PanelItem >
          <ViewHistory/>
        </PanelItem>
      </div>
      <div class="layout__control">
        <PanelItem>
          <PanelsControl
            :is-visible="isVisible"
            @update="updateView"
          />
        </PanelItem>
      </div>
    </div>
  </div>
</template>

<script>
import PanelItem from './components/PanelItem.vue';
import ViewExchange from './components/ViewExchange.vue';
import ViewCosts from './components/ViewCosts.vue';
import ViewHistory from './components/ViewHistory.vue';
import PanelsControl from './components/PanelsControl.vue';

export default {
  name: 'App',
  components: {
    PanelItem,
    ViewExchange,
    ViewCosts,
    ViewHistory,
    PanelsControl,
  },
  data() {
    return {
      isVisible: {
        costs: true,
        history: true,
      },
    };
  },
  async created() {
    this.$store.dispatch('init');
  },
  methods: {
    updateView(payload) {
      const { panel, value } = payload;
      this.isVisible[panel] = value;
    },
  },
};
</script>

<style>
  body {
    padding: 20px 10px;
    background-color: #ebf0f3;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #333;
  }
  * {
    box-sizing: border-box;
  }

  .layout {
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
  }

  .layout__control {
    position: sticky;
    bottom: 0;
    box-shadow: 0px -2px 1px 0px #0000000d;
  }

  @media screen and (min-width: 1024px) {
    body {
      padding-left: 20px;
      padding-right: 20px;
    }

    .layout {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: minmax(0, auto) minmax(0, 1fr);
      grid-column-gap: 20px;
      align-items: start;
    }

    .layout__exchange {
      grid-column-start: 1;
      grid-row-start: 1;
    }

    .layout__control {
      position: relative;
      grid-column-start: 1;
      grid-row-start: 2;
      grid-row-end: 3;
      box-shadow: none;
    }

    .layout__costs {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }

  @media screen and (min-width: 1280px) {
    .layout {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-template-rows: repeat(2, minmax(0, 1fr));
    }

    .layout__history {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
</style>
