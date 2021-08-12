<template>
  <div>
    <h1>Добро пожаловать в морской бой</h1>
    <button @click="handleGameStart">Начать игру</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const handleGameStart = () => {
      router.push({
        name: 'Setup',
      });
    };

    return { handleGameStart };
  },
};
</script>
