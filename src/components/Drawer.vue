<template>
  <div>
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            data-bs-whatever="@fat">Login</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Account:</label>
                                <input type="text" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Password:</label>
                                <input class="form-control" id="message-text"></input>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
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
      const canvas = document!.querySelector("canvas");
      const image = canvas?.toDataURL("image/jpeg") as string; // the variable is a base64 string.
      var a = document.createElement("a");
      let response = await pixelServerCli.saveImage(image);
      if (response.status === 0) {
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
