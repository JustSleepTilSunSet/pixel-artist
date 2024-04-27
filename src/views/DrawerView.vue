<template>
    <div>
        <Drawer ></Drawer>
      <!-- <button @click="count++">You clicked me {{ count }} times.</button> -->
      <!-- <canvas id="canvas">
        An alternative text describing what your canvas displays.
      </canvas> -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Drawer from '@/components/Drawer.vue'; // @ is an alias to /src

@Options({
  components: {
    Drawer
  },
  mounted(){
    // const canvas = document.querySelector("canvas");
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "green";
    // Add a rectangle at (10, 10) with size 100x100 pixels
    // ctx.fillRect(10, 10, 120, 120);
  }
})
export default class DrawerView extends Vue {}
</script>