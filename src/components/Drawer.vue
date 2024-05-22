<template>
  <div>
    <canvas
      ref="canvas"
      width="300"
      height="300"
      @mousemove="color"
    ></canvas>
  </div>

</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const drag = ref(false);
    const squares = ref(
      Array.from({ length: 30 }, () =>
        Array.from({ length: 30 }, () => ({ selected: false }))
      )
    );

    const draw = () => {
      const ctx = canvas.value?.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 300, 300);

        // 繪製網格
        ctx.beginPath();
        for (let xOffset = 10; xOffset < 300; xOffset += 10) {
          ctx.moveTo(xOffset, 0);
          ctx.lineTo(xOffset, 300);
        }
        for (let yOffset = 10; yOffset < 300; yOffset += 10) {
          ctx.moveTo(0, yOffset);
          ctx.lineTo(300, yOffset);
        }
        ctx.stroke();

        // 繪製方格
        squares.value.forEach((line, i) => {
          line.forEach((square, j) => {
            ctx.fillStyle = square.selected ? 'red' : 'white';
            ctx.fillRect(10 * j + 1, 10 * i + 1, 9, 9);
          });
        });
      }
    };

    const color = (event: MouseEvent) => {
      const rect = canvas.value!.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / 10);
      const y = Math.floor((event.clientY - rect.top) / 10);
      if (x >= 0 && x < 30 && y >= 0 && y < 30) {
        squares.value[y][x].selected = true;
        draw();
      }
    };

    const toDrawMode = (isDrawing: boolean) => {
      drag.value = isDrawing;
    };

    const toDraw = (event: MouseEvent) => {
      if (drag.value) {
        const ctx = canvas.value?.getContext('2d');
        if (ctx) {
          const rect = canvas.value!.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          ctx.fillStyle = 'green';
          ctx.fillRect(x, y, 30, 30);
        }
      }
    };

    onMounted(() => {
      draw();
    });

    return {
      canvas,
      drag,
      toDrawMode,
      toDraw,
      color
    };
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  border: 1px solid;
}
</style> 
