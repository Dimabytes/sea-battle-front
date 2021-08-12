<template>
  <div>
    <field @update:modelValue="update" :is-editable="true" v-model="fieldState"></field>
  </div>

</template>

<script>
import { ref } from 'vue';
import Field from '@/components/Field.vue';

export default {
  name: 'Setup',
  components: {
    Field,
  },
  setup() {
    const fieldState = ref({
      ships: [
        [
          {
            x: 5,
            y: 7,
            hit: false,
          },
          {
            x: 5,
            y: 8,
            hit: false,
          },
        ],
        //
        // [
        //   {
        //     x: 1,
        //     y: 1,
        //     hit: true,
        //   },
        //   {
        //     x: 1,
        //     y: 2,
        //     hit: true,
        //   },
        // ],
      ],
      hitCells: [
        {
          x: 6,
          y: 2,
        },
      ],
    });

    const update = (newValue) => {
      console.log(newValue);
    };

    return { fieldState, update };
  },
};
</script>

<style scoped>

</style>
