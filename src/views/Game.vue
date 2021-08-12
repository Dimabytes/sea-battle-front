<template>
  <div>
    <field v-model="myField"/>
    <field @cell-click="handleHit" v-model="enemyField"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import Field from '@/components/Field.vue';

const initialField = {
  ships: [
    [
      {
        x: 3,
        y: 3,
      },
    ],
    [
      {
        x: 5,
        y: 7,
      },
      {
        x: 5,
        y: 8,
      },
    ],
    [
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  ],
  hitCells: [],
};
export default {
  name: 'Game',
  components: {
    Field,
  },
  setup() {
    const myField = ref(initialField);
    const enemyField = ref(initialField);

    const handleHit = ({
      x,
      y,
    }) => {
      alert(`boom on ${x} ${y}`);
    };

    return { myField, enemyField, handleHit };
  },
};
</script>

<style scoped>

</style>
