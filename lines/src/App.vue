<template>
  <svg v-if="lines && width && height" height="100%" width="100%">
    <wiggly-line 
      v-for="y in lines" 
      :y="y" 
      :width="width" 
      :height="height" 
      :mouse-x="mouseX" 
      :mouse-y="mouseY"
      :segments="50" 
    />
  </svg>
</template>

<script>
import debounce from 'lodash/debounce';

import WigglyLine from './wiggly-line';

const numberOfLines = 25;

export default {
  name: 'app',
  components: {
    WigglyLine
  },
  data () {
    return {
      width: undefined,
      height: undefined,
      lines: undefined,
      mouseX: 0,
      mouseY: 0,
    };
  },
  created() {
    window.addEventListener("resize", () => {
      this.setDimensions();
      this.computeLineY();
    });
  },
  mounted() {
    this.setDimensions();
    this.computeLineY();
    window.addEventListener("mousemove", this.handleMouseMove);
  },
  computed: {
  },
  methods: {
    setDimensions(){
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    computeLineY() {
      const lines = Array(numberOfLines);
      for(let i = 0; i < numberOfLines; i++){
        lines[i] = window.innerHeight / numberOfLines * i;
      }
      this.lines = lines;
    },
    handleMouseMove: debounce(function(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, 8, { maxWait: 8 }) 
  }
}
</script>

<style lang="scss">

  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

</style>
