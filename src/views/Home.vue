<template>
  <div>
    <h1>Добро пожаловать в морской бой</h1>
    <button @click="handleGameStart">Начать игру</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { battleService } from '@/services/battleService';

export default {
  name: 'Home',
  setup() {
    const store = useStore();

    const router = useRouter();
    const handleGameStart = async () => {
      const res = await battleService.connect();
      if (res.data.code === 1) {
        store.commit('setUserId', res.data.id);
        await router.push({
          name: 'WaitAllConnected',
        });
      }
    };

    return { handleGameStart };
  },
};
</script>
