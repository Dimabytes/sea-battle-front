<template>
  <div class="wrapper">
    <a-row type="flex" align="middle" :gutter="[32,16]">
      <a-col span="10">
        <img src="@/assets/ship.svg" alt="pirate-ship">
      </a-col>
      <a-col span="8" offset="6">
        <base-button @click="handleGameStart" size="big">начать</base-button>

        <p class="error" v-if="errorText">{{errorText}}</p>
      </a-col>
    </a-row>
    <a-row type="flex"  align="middle" :gutter="[32,16]">
      <a-col span="10">
        <h1 class="main-title">
          Морской Бой 2021
        </h1>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { battleService } from '@/services/battleService';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'Home',
  components: {
    BaseButton,
  },
  setup() {
    const store = useStore();
    const errorText = ref(null);

    const router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const handleGameStart = async () => {
      const res = await battleService.connect();
      if (res.data.code === 1) {
        store.commit('setUserId', res.data.id);
        await router.push({
          name: 'WaitAllConnected',
        });
      } else {
        errorText.value = 'Игра уже идет, попробуйте позже';
      }
    };

    return { handleGameStart, errorText };
  },
};
</script>

<style lang="scss">
.main-title {
  font-size: 104px;
  line-height: 140px;
  text-shadow: -12px 12px 0px #002F6C;
  color: #01579B;
  letter-spacing: 2px;
  margin-bottom: 0;
}
.error {
  color: red;
  margin-top: 20px;
}
</style>
