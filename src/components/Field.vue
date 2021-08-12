<template>
  <div>
    <table>
      <tr v-for="y in 10" :key="y">
        <td @click="handleCellClick(x, y)" v-for="x in 10" :key="x">
          {{ getCellState(x, y) }}
        </td>
      </tr>
    </table>

    <div v-if="isEditable && activeShip !== undefined">
      <button @click="moveShip(0, -1)">up</button>
      <button @click="moveShip(0, 1)">down</button>
      <button @click="moveShip(-1, 0)">right</button>
      <button @click="moveShip(1, 0)">left</button>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue';

// 0 - пустая клетка
// 1 - промах по клетке
// 2 - подбитый корабль
// 3 - просто корабль
export default {
  name: 'Field',
  props: {
    modelValue: Object,
    isEditable: Boolean,
  },
  emits: ['cellClick', 'update:modelValue'],
  setup(props, { emit }) {
    const activeShip = ref(undefined);

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

      const { ship } = findShip(x, y);
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
    //
    const handleCellClick = (x, y) => {
      if (props.isEditable) {
        const { index } = findShip(x, y);
        activeShip.value = index;
      } else {
        emit('update:modelValue', { x, y });
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

<style>
.active {
  color: red;
}
</style>
