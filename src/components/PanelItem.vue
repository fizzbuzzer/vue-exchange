<template>
  <div class="panel-item">
    <div class="panel-item__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelItem',
};
</script>

<style scoped>
.panel-item {
  position: relative;
  height: 100%;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0px 3px 5px 0px #0000000d;
}
.panel-item__body {
  height: 100%;
}
@media screen and (min-width: 1024px) {
  .panel-item {
    padding: 30px;
  }
}
</style>
