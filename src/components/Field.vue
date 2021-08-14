<template>
  <div class="field-wrapper">
    <table class="field" :class="{ 'game': game }">
      <tbody>
      <tr>
        <td class="field-header"></td>
        <td class="field-header">а</td>
        <td class="field-header">б</td>
        <td class="field-header">в</td>
        <td class="field-header">г</td>
        <td class="field-header">д</td>
        <td class="field-header">е</td>
        <td class="field-header">ж</td>
        <td class="field-header">з</td>
        <td class="field-header">и</td>
        <td class="field-header">к</td>
      </tr>
      <tr v-for="y in 10" :key="y">
        <td class="field-header">{{ y }}</td>
        <td @click="handleCellClick(x - 1, y - 1)" v-for="x in 10" :key="x">

          <div class="cell active-cell" v-if="getCellState(x - 1, y - 1) === '4'"/>

          <div class="cell ship-cell" v-if="getCellState(x - 1, y - 1) === '3'"/>

          <div class="cell hit-cell" v-if="getCellState(x - 1, y - 1) === '2'">
            <CloseOutlined :style="{ color: '#000000' } "/>
          </div>

          <div class="cell empty-cell" v-if="getCellState(x - 1, y - 1) === '1'">
            <CloseOutlined :style="{ color: '#000000' } "/>
          </div>

          <div class="cell" v-if="getCellState(x - 1, y - 1) === '0'"/>

        </td>
      </tr>
      </tbody>
    </table>

    <div class="move-buttons" v-if="isEditable && activeShip !== undefined">
      <icon-button @click="moveShip(0, -1)"><UpCircleOutlined :style="{ color: '#ffffff' } "/></icon-button>
      <icon-button @click="moveShip(0, 1)"><DownCircleOutlined :style="{ color: '#ffffff' } "/></icon-button>
      <icon-button @click="moveShip(1, 0)"><RightCircleOutlined :style="{ color: '#ffffff' } "/></icon-button>
      <icon-button @click="moveShip(-1, 0)"><LeftCircleOutlined :style="{ color: '#ffffff' } "/></icon-button>
      <icon-button><RedoOutlined /></icon-button>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue';
import {
  LeftCircleOutlined, RightCircleOutlined, UpCircleOutlined, DownCircleOutlined, RedoOutlined, CloseOutlined,
} from '@ant-design/icons-vue';
import IconButton from '@/components/IconButton.vue';

// 0 - пустая клетка
// 1 - промах по клетке
// 2 - подбитый корабль
// 3 - просто корабль

export default {
  name: 'Field',
  props: {
    modelValue: Object,
    isEditable: Boolean,
    game: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LeftCircleOutlined,
    IconButton,
    RightCircleOutlined,
    UpCircleOutlined,
    DownCircleOutlined,
    RedoOutlined,
    CloseOutlined,
  },
  emits: ['cellClick', 'update:modelValue'],
  setup(props, { emit }) {
    const activeShip = ref(0);

    const findShip = (x, y) => {
      for (const [index, ship] of props.modelValue.ships.entries()) {
        for (const cell of ship) {
          if (cell.x === x && cell.y === y) {
            return { ship, index };
          }
        }
      }
      return { ship: undefined, index: -1 };
    };
    const getCellState = (x, y) => {
      const isHitCell = props.modelValue.hitCells.some(
        (el) => el.x === x && el.y === y,
      );
      if (isHitCell) {
        return '1';
      }

      const { ship, index } = findShip(x, y);
      if (index === activeShip.value && index !== -1) {
        return '4';
      }
      if (ship) {
        for (const cell of ship) {
          if (!cell.hit) {
            return '3';
          }
          return '2';
        }
      }
      return '0';
    };

    const handleCellClick = (x, y) => {
      if (props.isEditable) {
        const { index } = findShip(x, y);
        activeShip.value = index;
      } else {
        emit('cellClick', { x, y });
      }
    };

    const getNewActiveShip = (deltaX, deltaY) => {
      const ship = props.modelValue.ships[activeShip.value];

      return ship.map((el) => ({
        x: el.x + deltaX,
        y: el.y + deltaY,
        hit: el.hit,
      }));
    };

    const getNewShipsArray = (ship, index) => [
      ...props.modelValue.ships.slice(0, index),
      ship,
      ...props.modelValue.ships.slice(index + 1),
    ];

    const moveShip = (deltaX, deltaY) => {
      const newShip = getNewActiveShip(deltaX, deltaY);
      emit('update:modelValue', { ...props.modelValue, ships: getNewShipsArray(newShip, activeShip.value) });
    };

    return {
      getCellState, handleCellClick, activeShip, moveShip,
    };
  },
};
</script>

<style lang="scss">
.cell {
  font-size: 20px;
  width: 50px;
  height: 50px;
  background: #01579B;
}

.ship-cell {
  background: #9A999F;
  cursor: pointer;
}

table {
  border-spacing: unset;
}

td {
  border: 3px solid #002f6c;
  padding: unset;
}

.hit-cell {
  background: #ef9a9a;
}

.active-cell {
  background: #FFFFFF;
  border: 3px dotted #BA6B6C;
}

.field {
  &.game {
    & .field-header {
      width: 45px;
      height: 45px;
      font-size: 23px;
    }

    & .cell {
      width: 45px;
      height: 45px;
    }
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-header {
    width: 50px;
    height: 50px;
    text-align: center;
    border: 0;
    font-size: 30px;
    color: #002f6c;
  }
}

.move-buttons {
  display: flex;
  flex-direction: column;

  & button {
    margin: 8px;
  }
}
</style>
