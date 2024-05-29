<template>
  <div>
    <canvas ref="canvas" width="300" height="300" @mousedown="toDrawMode" @mousemove="toDraw" @mouseup="toCancelDraw">
      An alternative text describing what your canvas displays.
    </canvas>
    <button id="btn1" @click="toDownloadPainting">
      download
    </button>
    <button id="btn1" @click="toUploadPainting">
      upload
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import pixelServerCli from '@/services/pixelServerCli';
// import { ref } from 'vue';

interface Square {
  selected: boolean;
}


@Options({
  data() {
    return {
      drag: false,
      squares: Array.from({ length: 30 }, () =>
        Array.from({ length: 30 }, () => ({ selected: false } as Square))
      )
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context) {
        // 設置背景顏色
        context.fillStyle = 'black';
        context.fillRect(0, 0, 300, 300);

        // 繪製方格
        this.squares.forEach((line: Square[], i: number) => {
          line.forEach((square: Square, j: number) => {
            context.fillStyle = square.selected ? 'red' : 'white';
            context.fillRect(10 * j + 1, 10 * i + 1, 9, 9);
          });
        });
      }
    },
    toDrawMode() {
      this.drag = true;
    },
    toDraw(event: MouseEvent) {
      if (!this.drag) return;

      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / 10);
      const y = Math.floor((event.clientY - rect.top) / 10);

      if (x >= 0 && x < 30 && y >= 0 && y < 30) {
        this.squares[y][x].selected = true;
        this.draw();
      }
    },
    toCancelDraw() {
      this.drag = false;
    },
    toDownloadPainting() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = "Image.jpg";
      a.click();
    },
    toUploadPainting: async function () {
      const canvas = document!.querySelector("canvas");
      const image = canvas?.toDataURL("image/jpeg") as string; // the variable is a base64 string.
      var a = document.createElement("a");
      let response = await pixelServerCli.saveImage(image);
      if(response.status ===0){
        alert("上傳成功");
      }
    }
  }
})
export default class Drawer extends Vue {
  declare $refs: {
    canvas: HTMLCanvasElement;
  };
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
