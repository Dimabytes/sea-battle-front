<template>
  <div class="wrapper">
    <h1 v-if="gameState.isYourTurn">now is your turn</h1>
    <h1 v-else>enemy turn</h1>

    <a-row>
      <field v-model="myField" :game="true"/>
      <field @cell-click="handleHit" v-model="enemyField" :game="true"/>
    </a-row>

    <h1 v-if="isGameOver">game over</h1>

  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Field from '@/components/Field.vue';
import { battleService } from '@/services/battleService';

export default {
  name: 'Game',
  components: {
    Field,
  },
  setup() {
    const gameState = ref({ isGameOverFlag: false, isYourTurn: false });
    const isGameOver = ref(false);
    const enemyField = ref({ ships: [], hitCells: [] });
    const myField = ref({ ships: [], hitCells: [] });
    const { state } = useStore();

    const getGameState = async () => {
      const res = await battleService.getGameState(state.userId);
      gameState.value = {
        isGameOverFlag: res.data.isGameOverFlag,
        isYourTurn: res.data.actualField.isYourTurn,
      };

      myField.value = res.data.actualField.fieldState;

      if (res.data.isGameOverFlag) {
        isGameOver.value = true;
      } else {
        setTimeout(getGameState, 3000);
      }
    };

    onMounted(() => {
      getGameState();
    });

    const handleHit = async ({
      x,
      y,
    }) => {
      if (gameState.value.isYourTurn) {
        const res = await battleService.makeHit({ x, y, id: state.userId });
        enemyField.value = res.data.enemyField.fieldState;
        if (res.data.isGameOverFlag) {
          isGameOver.value = true;
        }
      }
    };
    const router = useRouter();
    watchEffect(() => {
      if (isGameOver.value) {
        setTimeout(() => {
          router.push({
            name: 'Home',
          });
        }, 10000);
      }
    });

    return {
      gameState, enemyField, handleHit, isGameOver, myField,
    };
  },
};
</script>

<style scoped>

</style>
