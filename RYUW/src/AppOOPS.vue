<template>
  <div>
    <Renderer
      id="renderer"
      ref="renderer"
      width="900"
      height="900"
      alpha
      @contextmenu.prevent
    >
      <Camera :position="{ x: 0, y: 0, z: 10 }" />
      <OrbitControls
        ref="orbitControls"
        :enableDamping="true"
        :dampingFactor="0.05"
        :screenSpacePanning="true"
        :mouseButtons="mouseButtons"
      />
      <Scene>
        <PointLight :position="{ y: 10, z: 10 }" />
        <Box :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }" :position="{ x: 0, y: 0, z: 0 }">
          <LambertMaterial />
        </Box>
        <Box :position="{ x: 0, y: -2, z: 0 }">
          <LambertMaterial />
        </Box>
        <template v-for="anchor in anchors" :key="anchor.id">
          <Box :position="anchor.position">
            <LambertMaterial />
          </Box>
        </template>
        <template v-for="tag in tags" :key="tag.id">
          <Box :position="tag.position">
            <LambertMaterial />
          </Box>
        </template>
      </Scene>
    </Renderer>

    <div class="buttonsGrid">
      <div/>
      <button @click="cameraMoveForward">
        <iconUp/>
      </button>
      <div/>
      <button @click="cameraZoomIn">
        <iconZoomIn/>
      </button>
      <div/>
      <button @click="cameraRotateUp">
        <iconRotateUp/>
      </button>
      <button @click="cameraReset">
        <iconRestart/>
      </button>

      <button @click="cameraMoveLeft">
        <iconLeft/>
      </button>
      <button @click="cameraMoveBack">
        <iconDown/>
      </button>
      <button @click="cameraMoveRight">
        <iconRight/>
      </button>
      <button @click="cameraZoomOut">
        <iconZoomOut/>
      </button>
      <button @click="cameraRotateCounterClockwise">
        <iconCounterClockwise/>
      </button>
      <button @click="cameraRotateDown">
        <iconRotateDown/>
      </button>
      <button @click="cameraRotateClockwise">
        <iconClockwise/>
      </button>
    </div>
  </div>
</template>

<script>
import iconUp from '@/assets/svg/up.vue';
import iconDown from '@/assets/svg/down.vue';
import iconLeft from '@/assets/svg/left.vue';
import iconRight from '@/assets/svg/right.vue';
import iconClockwise from '@/assets/svg/clockwise.vue';
import iconCounterClockwise from '@/assets/svg/counterClockwise.vue';

import iconZoomIn from '@/assets/svg/zoomIn.vue';
import iconZoomOut from '@/assets/svg/zoomOut.vue';
import iconRestart from '@/assets/svg/restart.vue';
import iconRotateUp from '@/assets/svg/rotateUp.vue';
import iconRotateDown from '@/assets/svg/rotateDown.vue';
import * as THREE from 'three'; 

export default {
  name: 'OrbitExample',
  components: {
    iconUp,
    iconDown,
    iconLeft,
    iconRight,
    iconClockwise,
    iconCounterClockwise,
    iconZoomIn,
    iconZoomOut,
    iconRestart,
    iconRotateUp,
    iconRotateDown,
  },
  data() {
    return {
      mouseButtons: {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      },
      anchors: [
        {
          id: 1,
          name: 'anchor1',
          position: { x: 2, y: 0, z: 0 },
        },
        {
          id: 2,
          name: 'anchor2',
          position: { x: -2, y: 1, z: 0 },
        }
      ],
      tags: [
        {
          id: 1,
          name: 'tag1',
          position: { x: 0, y: 1, z: -2 },
        },
        {
          id: 2,
          name: 'tag2',
          position: { x: 2, y: 1, z: 2 },
        }
      ],
    };
  },
  methods: {
    orbit() { return this.$refs.orbitControls; },
    cameraReset() {
      if (!this.orbit()) return;
      this.orbit().reset();
    },
    cameraZoomIn() {
      if (!this.orbit()) return;
      this.orbit().dollyIn(1.2);
      this.orbit().update();
    },
    cameraZoomOut() {
      if (!this.orbit()) return;
      this.orbit().dollyOut(1.2);
      this.orbit().update();
    },
    cameraRotateUp() {
      if (!this.orbit()) return;
      this.orbit().rotateUp(0.2);
      this.orbit().update();
    },
    cameraRotateDown() {
      if (!this.orbit()) return;
      this.orbit().rotateUp(-0.2);
      this.orbit().update();
    },
    cameraRotateClockwise() {
      if (!this.orbit()) return;
      this.orbit().rotateLeft(0.2);
      this.orbit().update();
    },
    cameraRotateCounterClockwise() {
      if (!this.orbit()) return;
      this.orbit().rotateLeft(-0.2);
      this.orbit().update();
    },
    cameraMoveForward() {
      if (!this.orbit()) return;
      this.orbit().pan(0, -0.5);
      this.orbit().update();
    },
    cameraMoveBack() {
      if (!this.orbit()) return;
      this.orbit().pan(0, 0.5);
      this.orbit().update();
    },
    cameraMoveLeft() {
      if (!this.orbit()) return;
      this.orbit().pan(-0.5, 0);
      this.orbit().update();
    },
    cameraMoveRight() {
      if (!this.orbit()) return;
      this.orbit().pan(0.5, 0);
      this.orbit().update();
    },
  },
};
</script>

<style>
:root {
  --backgroundColor: #15161a;
  --fontColor: #eee;
  --panelOutlineColor: #282a30;
  --panelBackgroundColor: #1e1f24;
  --scrollBackground: #1e1f24;
  --scrollThumb: #282a30;
  --buttonBackgroundColor: #373a41;
  --buttonHoverColor: #676b75;
  --buttonActiveColor: #181a1f;
  --buttonTextColor: #d5d6db;
}
body {
  font-family: 'Arial', sans-serif;
  background-color: var(--backgroundColor);
  color: var(--fontColor);
  margin: 0;
  padding: 0;
}
.buttonsGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
}
.buttonsGrid > * {
  aspect-ratio: 1;
  width: 4rem;
  height: 4rem;
}
.buttonsGrid > button {
  all: unset;
  box-sizing: content-box;
  aspect-ratio: 1;
  width: 4rem;
  height: 4rem;
  background-color: var(--buttonBackgroundColor);
  color: var(--buttonTextColor);
  border: 1px solid var(--panelOutlineColor);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonsGrid > button:hover {
  background-color: var(--buttonHoverColor);
}
.buttonsGrid > button:active {
  background-color: var(--buttonActiveColor);
}
</style>
