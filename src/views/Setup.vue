<template>
  <div class="wrapper">
    <a-row :gutter="[32,16]" type="flex" justify="center" align="bottom">
      <a-col span="12">
        <div
          v-if="!isWaitOtherPlayer"
          class="mb-50"
        >
          <base-button
            @click="handleSubmit"
          >
            играть
          </base-button>
        </div>

          <p
            class="text waiting-text mb-50"
            v-else
          >
            ждём соперника...
          </p>
      </a-col>
      <a-col span="12">
        <div class="pirate mb-50">
          <img src="@/assets/player.svg" alt="kind-pirate">
          <span class="text">{{ playerName }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" :gutter="[32,16]">
      <a-col span="24">
        <field :is-editable="true" v-model="fieldState"></field>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Field from '@/components/Field.vue';
import { battleService } from '@/services/battleService';
import BaseButton from '@/components/BaseButton.vue';

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
    BaseButton,
  },
  setup() {
    const store = useStore();
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

    const playerName = computed(() => {
      const pirateNames = [
        'Ситцевый Джек',
        'Джек Воробей',
        'Чёрный Сэм',
        'Сэр Френсис Дрейк',
        'Долговязый Бен',
      ];

      return pirateNames[Math.floor(Math.random() * pirateNames.length)];
    });

    store.commit('setPlayerName', playerName);

    return {
      fieldState, handleSubmit, isWaitOtherPlayer, playerName,
    };
  },
};
</script>

<style lang="scss">
.pirate {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  img {
    height: 150px;
  }
}

.waiting-text {
  text-align: left;
  padding-left: 50px;
}
</style>
