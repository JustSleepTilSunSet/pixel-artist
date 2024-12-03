<template>
  <div>
    <div class="row my-3">
      <div class="col-12 bg-light p-5 text-center">
        <canvas ref="canvas" width="720" height="360" @mousedown="toDrawMode" @mousemove="toDraw"
          @mouseup="toCancelDraw">
        </canvas>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-center">
        <button id="btn1" @click="toDownloadPainting">
          download
        </button>
      </div>
      <div class="col-6 text-center">
        <button color="primary" id="btn2" @click="toUploadPainting">
          upload
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import pixelServerCli from '@/services/pixelServerCli';

interface Square {
  selected: boolean;
}


@Options({
  data() {
    return {
      drag: false,
      squares: Array.from({ length: 90 }, () =>
        Array.from({ length: 90 }, () => ({ selected: false } as Square))
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
        context.fillRect(0, 0, 900, 900);

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

      if (x >= 0 && x < 90 && y >= 0 && y < 90) {
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
      // NOTICE: Please instead v-model.
      const canvas = document!.querySelector("canvas");
      console.log(sessionStorage.getItem("access_token"));
      let accessToken = sessionStorage.getItem("access_token");
      await canvas?.toBlob(async (blob)=>{
          // await pixelServerCli.uploadPainting(blob, accessToken);
      });
    }
    // base64 to blob.
    // base64ToArrayBuffer: function (base64: string) {
    //   let binaryString = atob(base64);
    //   let bytes = new Uint8Array(binaryString.length);
    //   for (let i = 0; i < binaryString.length; i++) {
    //       bytes[i] = binaryString.charCodeAt(i);
    //   }
    //   return bytes.buffer;
    // }
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
