<template>
  <div>
    <canvas id="canvas" @mousedown="toDrawMode()" @mousemove="toDraw($event)" @mouseup="toCancelDraw()">
      An alternative text describing what your canvas displays.
    </canvas>
    <button id="btn1" @click="toDownloadPainting()">
      download
    </button>
    <button id="btn1" @click="toUploadPainting()">
      upload
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import pixelServerCli from '@/services/pixelServerCli';
import { ref } from 'vue';

@Options({
  props: {
  },
  data() {
    const drag = ref(false);
    return {
      drag
    }
  },
  mounted() {
    const canvas = document!.querySelector("canvas");
    const ctx = canvas!.getContext("2d");
    // Set b.g. color.
    ctx!.fillStyle = "#FFFFFF";
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    // Draw grid.
    ctx!.beginPath();
    for (let xOffset = 20; xOffset < canvas!.width; xOffset += 20) {
      ctx!.moveTo(xOffset, 0);
      ctx!.lineTo(xOffset, canvas!.height);
    }
    for (let yOffset = 20; yOffset < canvas!.height; yOffset += 20) {
      ctx!.moveTo(0, yOffset);
      ctx!.lineTo(canvas!.width, yOffset);
    }
    ctx!.stroke(); // Render the path
  },
  methods: {
    toDrawMode: function () {
      this.drag = true;
    },

    toDraw: function (event: any) {
      const canvas = document!.querySelector("canvas");
      const ctx = canvas!.getContext("2d");
      var dragEnd: any;
      if (this.drag) {
        let rect = canvas!.getBoundingClientRect();
        dragEnd = {
          x: event.clientX - rect!.left,
          y: event.clientY - rect!.top
        }
        // TODO: to ambiguous coordinate.
        ctx!.fillStyle = "green";
        ctx!.fillRect(dragEnd.x, dragEnd.y, 5, 5);
      }
    },

    toCancelDraw: function () {
      this.drag = false;
    },

    toDownloadPainting: function () {
      const canvas = document!.querySelector("canvas");
      const image = canvas?.toDataURL("image/jpeg") as string; // the variable is a base64 string.
      var a = document.createElement("a");
      a.href = "data:image/png;base64," + image.split(';base64,')[1]; //Image Base64 Goes here
      a.download = "Image.jpg";
      a.click();
    },
    toUploadPainting: async function () {
      const canvas = document!.querySelector("canvas");
      const image = canvas?.toDataURL("image/jpeg") as string; // the variable is a base64 string.
      var a = document.createElement("a");
      await pixelServerCli.saveImage(image);
    }
  }
})
export default class Drawer extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  border: 1px solid;
  width: 120;
  height: 120;
}
</style>
