<template>
  <div>
    <field :is-editable="true" v-model="fieldState"></field>

    <button @click="handleSubmit">submit plan</button>

  </div>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
  name: 'Setup',
  components: {
    Field,
  },
  setup() {
    const fieldState = ref(initialField);
    const router = useRouter();

    const handleSubmit = () => {
      router.push({
        name: 'Game',
      });
    };

    return { fieldState, handleSubmit };
  },
};
</script>

<style scoped>

</style>
