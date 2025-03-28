<template>
  <Renderer
    class="renderer"
    antialias
    :width="'width"
    :height="height"
    style="display: block; margin: auto;">

    <Scene ref="scene">
      <PerspectiveCamera
        ref="camera"
        :position="cameraPos"
        :fov="75"
        :near="0.1"
        :far="1000"/>

      <Box :position="{ x: 0, y: 0, z: 0 }"/>
    </Scene>
  </Renderer>
</template>

<script>

export default {
  name: 'SimpleCube',
  data() {
    return {
      // Track the canvas width/height
      width: window.innerWidth * 1,
      height: window.innerHeight * 1,

      // Camera position is an object so we can update it reactively
      cameraPos: { x: 0, y: 0, z: 5 }
    }
  },
  mounted() {
    // Add event listeners
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeyDown)
    this.handleResize();

    const orbitCtrl = this.$refs.renderer.three.cameraCtrl

    // For example, disable pan:
    orbitCtrl.enablePan = false

    // You can also listen to events
    orbitCtrl.addEventListener('change', () => {
      console.log('Camera or orbit controls changed.')
    })

    orbitCtrl.addEventListener('start', () => {
      console.log('Orbit interaction started.')
    })

    orbitCtrl.addEventListener('end', () => {
      console.log('Orbit interaction ended.')
    })
  },
  unmounted() {
    // Clean up event listeners
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    // Adjust the canvas size on window resize
    handleResize() {
      this.width = window.innerWidth * 1
      this.height = window.innerHeight * 1
    },
    // Move the camera left/right when arrow keys are pressed
    handleKeyDown(event) {
      const step = 0.2
      if (event.code === 'ArrowLeft') {
        this.cameraPos.x -= step
      } else if (event.code === 'ArrowRight') {
        this.cameraPos.x += step
      }
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

.renderer {
  display: block;
  margin: 0 auto;
}
</style>
