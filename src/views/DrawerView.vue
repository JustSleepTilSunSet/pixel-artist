<template>
  <div>
    <div class="row my-3">
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"  @click="toUploadPainting">Save changes</button>
            </div>
          </div>
        </div>
      </div>

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
        <button color="primary" id="btn2" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">
          <i class="bi bi-arrow-bar-up"></i> 
          upload
        </button>
      </div>
    </div>
    <!-- <p> TBD </p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Modal from "bootstrap/js/dist/modal";
import pixelServerCli from '@/services/pixelServerCli';

interface Square {
  selected: boolean;
}

const drag = ref(false);
const squares = reactive(
  Array.from({ length: 90 }, () =>
    Array.from({ length: 90 }, () => ({ selected: false }))
  )
);
const canvas = ref<HTMLCanvasElement | null>(null);
const exampleModal = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

const draw = () => {
  if (!canvas.value) return;
  const context = canvas.value.getContext("2d");
  if (context) {
    // 設置背景顏色
    context.fillStyle = "black";
    context.fillRect(0, 0, 900, 900);

    // 繪製方格
    squares.forEach((line, i) => {
      line.forEach((square, j) => {
        context.fillStyle = square.selected ? "red" : "white";
        context.fillRect(10 * j + 1, 10 * i + 1, 9, 9);
      });
    });
  }
};

const toDrawMode = () => {
  drag.value = true;
};

const toDraw = (event: MouseEvent) => {
  if (!drag.value || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / 10);
  const y = Math.floor((event.clientY - rect.top) / 10);

  if (x >= 0 && x < 90 && y >= 0 && y < 90) {
    squares[y][x].selected = true;
    draw();
  }
};

const toCancelDraw = () => {
  drag.value = false;
};

const toDownloadPainting = () => {
  if (!canvas.value) return;
  const a = document.createElement("a");
  a.href = canvas.value.toDataURL("image/jpeg");
  a.download = "Image.jpg";
  a.click();
};

const toUploadPainting = async () => {
  // NOTICE: Please instead v-model.
  const canvas = document!.querySelector("canvas");
  console.log(sessionStorage.getItem("access_token"));
  let accessToken = sessionStorage.getItem("access_token");
  await canvas?.toBlob(async (blob) => {
    await pixelServerCli.uploadPainting(blob, accessToken);
  });
};

// 掛載時初始化
onMounted(() => {
  draw();
});
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
