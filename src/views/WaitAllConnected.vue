<template>
<div class="wrapper">
  <a-row type="flex" justify="center" align="middle" :gutter="[32,16]">
    <img src="@/assets/wheel.svg" alt="wheel" class="wheel">
  </a-row>
  <a-row type="flex" justify="center" align="middle" :gutter="[32,16]">
    <span class="loading-text">
      загрузка
    </span>
  </a-row>
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

<style>
.wheel {
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 4s linear infinite;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

.loading-text {
  font-size: 64px;
  color: #002f6c;
}
</style>
