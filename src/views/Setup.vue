<template>
  <div>

    <field :is-editable="true" v-model="fieldState"></field>

    <button v-if="!isWaitOtherPlayer" @click="handleSubmit">submit plan</button>
    <p v-else>wait for other player</p>

  </div>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Field from '@/components/Field.vue';
import { battleService } from '@/services/battleService';

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
    const { state } = useStore();

    const isWaitOtherPlayer = ref(false);

    const updateIsFieldsReady = async () => {
      const res = await battleService.isFieldsReady();
      if (res.data.isFieldsReady) {
        await router.push({
          name: 'Game',
        });
      } else {
        setTimeout(updateIsFieldsReady, 3000);
      }
    };

    const handleSubmit = async () => {
      isWaitOtherPlayer.value = true;
      await battleService.setField(state.userId, fieldState.value.ships);
      updateIsFieldsReady();
    };

    return { fieldState, handleSubmit, isWaitOtherPlayer };
  },
};
</script>

<style scoped>

</style>
