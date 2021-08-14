<template>
<button class="icon-button">
  <slot/>
</button>
</template>

<script>
export default {
  name: 'IconButton',
};
</script>

<style scoped lang="scss">
.icon-button {
  background: #01579B;
  box-shadow: -12px 12px 0px #002f6c;
  text-transform: lowercase;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-color: #01579B;
  color: #fff;
  height: 90px;
  padding: 0 10px 10px 10px;
  width: 90px;
  font-size: 50px;

  &:hover {
    background: #002F6C;
    border-color: #002F6C;
  }

  &:active {
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
