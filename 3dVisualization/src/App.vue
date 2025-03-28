<template>
  <Renderer
    ref="rendererRef"
    antialias
    resize="window"
    :orbit-ctrl="{ enableDamping: true }"
    style="display: block; margin: auto;"
  >
    <Camera :position="{ x: 0, y: 5, z: 10 }" />
    <Scene>
      <PointLight :position="{ x: 0, y: 50, z: 50 }" />

      <!-- Floor -->
      <Plane :width="20" :height="20" :rotation="{ x: -Math.PI / 2 }">
        <LambertMaterial color="gray" />
      </Plane>

      <!-- Anchors -->
      <template v-for="anchor in anchors" :key="anchor.id">
        <Box :size="0.1" :position="anchor.position">
          <LambertMaterial color="red" />
        </Box>
        <Text
          :ref="'anchorText' + anchor.id"
          :text="anchor.name"
          :fontSrc="fontPath"
          :position="{
            x: anchor.position.x,
            y: anchor.position.y + 0.25,
            z: anchor.position.z
          }"
          :size="0.25"
          :height="0.1"
          @ready="onTextReady"
        />
      </template>

      <!-- Tags -->
      <template v-for="tag in tags" :key="tag.id">
        <Box :size="0.1" :position="tag.position">
          <LambertMaterial color="blue" />
        </Box>
        <Text
          :ref="'tagText' + tag.id"
          :text="tag.name"
          :fontSrc="fontPath"
          :position="{
            x: tag.position.x,
            y: tag.position.y + 0.25,
            z: tag.position.z
          }"
          :size="0.25"
          :height="0.1"
          @ready="onTextReady"
        />
      </template>
    </Scene>
  </Renderer>

  <!-- Info / Controls -->
  <div id="info">
    <h1>i</h1>
    <div class="list">
      <div>Lewy przycisk myszki do rotacji</div>
      <div>Prawy przycisk myszki do przesuwania</div>
      <div>Kółko myszki do zoomu</div>
      <div>Scroll myszki do zoomu</div>
    </div>
  </div>

  <!-- Anchors / Tags Editor -->
  <div id="anchorsAndTags">
    <h1>Tagi i Kotwice</h1>

    <!-- Anchors -->
    <h2>Anchors</h2>
    <div class="list">
      <div
        v-for="anchor in anchors"
        :key="anchor.id"
      >
        <input type="text" v-model="anchor.name" />
        <input type="number" v-model="anchor.position.x" />
        <input type="number" v-model="anchor.position.y" />
        <input type="number" v-model="anchor.position.z" />
        <button @click="delAnchor(anchor.id)">x</button>
      </div>
      <button @click="addAnchor">+</button>
    </div>

    <!-- Tags -->
    <h2>Tags</h2>
    <div class="list">
      <div
        v-for="tag in tags"
        :key="tag.id"
      >
        <input type="text" v-model="tag.name" />
        <input type="number" v-model="tag.position.x" />
        <input type="number" v-model="tag.position.y" />
        <input type="number" v-model="tag.position.z" />
        <button @click="delTag(tag.id)">x</button>
      </div>
      <button @click="addTag">+</button>
    </div>
  </div>
</template>

<script>
import {
  Renderer,
  Scene,
  Camera,
  Plane,
  Box,
  LambertMaterial,
  Text,
  PointLight,
} from 'troisjs'

export default {
  name: 'MyScene',
  components: {
    Renderer,
    Scene,
    Camera,
    Plane,
    Box,
    LambertMaterial,
    Text,
    PointLight,
  },
  data() {
    return {
      fontPath: './helvetiker_regular.typeface.json',
      anchors: [
        {
          id: 1,
          name: 'anchor1',
          position: { x: 2, y: 2, z: 0 },
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
    }
  },
  mounted() {
    const rendererComp = this.$refs.rendererRef
    if (!rendererComp) return

    // Each frame, make text mesh face the camera
    rendererComp.$on('beforeRender', () => {
      const camera = rendererComp.three.camera
      // Billboard anchors
      this.anchors.forEach(anchor => {
        const textRef = this.$refs['anchorText' + anchor.id]
        if (textRef?.mesh) {
          textRef.mesh.lookAt(camera.position)
        }
      })
      // Billboard tags
      this.tags.forEach(tag => {
        const textRef = this.$refs['tagText' + tag.id]
        if (textRef?.mesh) {
          textRef.mesh.lookAt(camera.position)
        }
      })
    })
  },
  methods: {
    // Center text geometry on load
    onTextReady(mesh) {
      if (mesh?.geometry) {
        mesh.geometry.center()
      }
    },

    // Add a new anchor with a unique ID
    addAnchor() {
      const nextId = this.anchors.length
        ? Math.max(...this.anchors.map(a => a.id)) + 1
        : 1
      this.anchors.push({
        id: nextId,
        name: 'new anchor',
        position: { x: 0, y: 0, z: 0 }
      })
    },

    // Delete an anchor
    delAnchor(anchorId) {
      this.anchors = this.anchors.filter(a => a.id !== anchorId)
    },

    // Add a new tag with a unique ID
    addTag() {
      const nextId = this.tags.length
        ? Math.max(...this.tags.map(t => t.id)) + 1
        : 1
      this.tags.push({
        id: nextId,
        name: 'new tag',
        position: { x: 0, y: 0, z: 0 }
      })
    },

    // Delete a tag
    delTag(tagId) {
      this.tags = this.tags.filter(t => t.id !== tagId)
    }
  },
  watch: {
    anchors: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.anchors.forEach(anchor => {
            const textRef = this.$refs['anchorText' + anchor.id]
            if (textRef?.mesh?.geometry) {
              textRef.mesh.geometry.center()
            }
          })
        })
      }
    },
    tags: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.tags.forEach(tag => {
            const textRef = this.$refs['tagText' + tag.id]
            if (textRef?.mesh?.geometry) {
              textRef.mesh.geometry.center()
            }
          })
        })
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: #ccc;
  font-family: "Roboto", sans-serif;
  overflow: hidden;
}
#info {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 100;
  color: white;
}
#anchorsAndTags {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  z-index: 100;
  color: white;
}
#info h1,
#anchorsAndTags h1 {
  font-size: 1.5rem;
  margin: 0;
  opacity: 0.5;
  cursor: pointer;
}
#info *:not(h1),
#anchorsAndTags *:not(h1) {
  display: none;
}
#info:hover h1,
#anchorsAndTags:hover h1 {
  display: none;
}
#info:hover *:not(h1),
#anchorsAndTags:hover *:not(h1) {
  display: flex;
}
.list {
  display: flex;
  flex-direction: column;
}
</style>
