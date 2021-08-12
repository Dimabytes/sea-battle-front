<template>
<div>
  <h1>loading...</h1>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { battleService } from '@/services/battleService';

export default {
  name: 'WaitAllConnected',

  setup() {
    const isAllConnected = ref(false);
    const router = useRouter();
    const updateConnected = async () => {
      const res = await battleService.isAllConnected();
      if (res.data.isAllConnected) {
        await router.push({
          name: 'Setup',
        });
      } else {
        setTimeout(updateConnected, 3000);
      }
    };

    onMounted(() => {
      updateConnected();
    });

    return { isAllConnected };
  },
};
</script>

<style scoped>

</style>
