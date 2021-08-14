<template>
  <a-button
    :class="`${size}`"
    v-bind:="$attrs"
  >
    <slot />
  </a-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    size: {
      type: String,
      default: 'middle',
    },
  },
};
</script>

<style scoped lang="scss">
.ant-btn {
  background: #01579B;
  box-shadow: -12px 12px 0px #002F6C;
  text-transform: lowercase;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-color: #01579B;
  color: #fff;
  height: 100px;
  padding: 30px;

  &:hover {
    background: #002F6C;
    border-color: #002F6C;
  }

  &:active {
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

.big {
  font-size: 42px;
  line-height: 42px;
}

.middle {
  font-size: 32px;
  line-height: 32px;
}
</style>
