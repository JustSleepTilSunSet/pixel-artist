<template>
  <div>
    <canvas id="canvas" @mousedown="toDrawMode()" @mousemove="toDraw($event)" @mouseup="toCancelDraw()">
      An alternative text describing what your canvas displays.
    </canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
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
    toDraw: function (event:any) {
      const canvas = document!.querySelector("canvas");
      const ctx = canvas!.getContext("2d");
      var dragEnd: any;
      if (this.drag) {
        let rect = canvas!.getBoundingClientRect();
        dragEnd = {
          x: event.clientX - rect!.left,
          y: event.clientY - rect!.top
        }
        ctx!.fillStyle = "black";
        ctx!.fillRect(dragEnd.x, dragEnd.y, 5, 5);
      }
    },
    toCancelDraw: function(){
      this.drag = false;
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
