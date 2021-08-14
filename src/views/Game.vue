<template>
  <div class="wrapper">
    <a-row type="flex" align="middle" :gutter="[32,16]">
      <a-col span="6" class="pirate-block mb-50">
        <img src="@/assets/player.svg" alt="kind-pirate">
        <span class="name">{{ playerName }}</span>
      </a-col>

      <a-col span="12">
        <h1 v-if="gameState.isYourTurn" class="text">твой ход</h1>
        <h1 v-else class="text">ход противника</h1>
      </a-col>

      <a-col span="6" class="pirate-block enemy-block mb-50">
        <img src="@/assets/enemy.svg" alt="evil-pirate">
        <span class="name">Злейший Враг</span>
      </a-col>
    </a-row>

    <a-row>
      <a-col span="12">
        <field v-model="myField" :game="true"/>
      </a-col>
      <a-col span="12 enemy">
        <field @cell-click="handleHit" v-model="enemyField" :game="true"/>
      </a-col>
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
    const store = useStore();
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

    const playerName = store.getters.getPlayerName;

    return {
      gameState, enemyField, handleHit, isGameOver, myField, playerName,
    };
  },
};
</script>

<style lang="scss">
.pirate-block {
  display: flex;
  flex-direction: column;

  & img {
    height: 150px;
  }
}

.enemy-block {
  justify-content: flex-end;
}

.name {
  color: #002F6C;
  font-size: 18px;
  text-align: center;
}
</style>
