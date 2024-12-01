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
            <div class="modal-body d-flex justify-content-center align-items-center flex-column">
              <div class="col-sm-9 text-center">
                Your painting
                <img :src="uploadedThumbnail" class="img-fluid"></img>
                <div class="row justify-content-center align-items-center">
                  <div class="col-8 col-sm-6 text-center">
                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="PaintingName">

                  </div>
                  <div class="col-4 col-sm-6 text-center">
                    <label for="paintingDescription" class="form-label">Description</label>
                    <textarea class="form-control" id="paintingDescription" rows="3"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="toUploadPainting">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div id="paintingCanvas" class="col-12 p-5 text-center">
        <canvas ref="canvas" width="720" height="360" @mousedown="toDrawMode" @mousemove="toDraw"
          @mouseup="toCancelDraw">
        </canvas>
        <div class="form-group d-flex align-items-center gap-3">
          <button type="button" class="btn btn-primary p-1 rounded-circle" @click="cleanColor">
            <i class="bi bi-eraser rounded-circle"></i>
          </button>
          <input type="color" class="form-control form-control-color" id="colorPicker" :v-model="selectedColor"
            @change="onColorChange" title="Choose your color">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-center">
        <button id="btn1" @click="toDownloadPainting" class="btn btn-info">
          <i class="bi bi-arrow-bar-down"></i>
          download
        </button>
      </div>
      <div class="col-6 text-center">
        <button color="primary" id="btn2"  @change="onColorChange" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info"
          @click="showUploadedModal">
          <i class="bi bi-arrow-bar-up"></i>
          upload
        </button>
      </div>
    </div>
    <!-- <p> TBD </p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import pixelServerCli from '@/services/pixelServerCli';

const uploadedThumbnail = ref();
const drag = ref(false);
const squares = reactive(
  Array.from({ length: 90 }, () =>
    Array.from({ length: 90 }, () => ({ selected: false, color:"#00000" }))
  )
);
const canvas = ref<HTMLCanvasElement | null>(null);
const selectedColor = ref("#563d7c");
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
        context.fillStyle = square.selected ? square.color : "white";
        context.fillRect(10 * j + 1, 10 * i + 1, 9, 9);
      });
    });
  }
};

const toDrawMode = () => {
  drag.value = true;
};
const cleanColor = ()=>{
  selectedColor.value = "white";
}
const toDraw = (event: MouseEvent) => {
  if (!drag.value || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / 10);
  const y = Math.floor((event.clientY - rect.top) / 10);

  if (x >= 0 && x < 90 && y >= 0 && y < 90) {
    squares[y][x].selected = true;
    squares[y][x].color = selectedColor.value;
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

const onColorChange = (event) => {
  selectedColor.value = event.target.value;
};

const showUploadedModal = () => {
  paintToBase64();
}
const toUploadPainting = async () => {
  // NOTICE: Please instead v-model.
  const canvas = document!.querySelector("canvas");
  let accessToken = sessionStorage.getItem("access_token");
  await canvas?.toBlob(async (blob) => {
    await pixelServerCli.uploadPainting(blob, accessToken);
  });
};
const paintToBase64 = () => {
  uploadedThumbnail.value = canvas.value.toDataURL("image/jpeg");
}

// 掛載時初始化
onMounted(() => {
  draw();
});
</script>

<style>
#paintingCanvas {
  border: 1px solid black;
  background-image: url('@/assets/canvas-bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
