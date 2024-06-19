<template>
    <div>
        <Drawer></Drawer>
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
  }
})
export default class DrawerView extends Vue {}
</script>