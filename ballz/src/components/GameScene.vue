<template>
    <div ref="container" class="game-container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'GameScene',
    props: {
      player1Name: String,
      player2Name: String
    },
    data() {
      return {
        // Używamy zmiennych reaktywnych tylko dla danych, które muszą być reaktywne
        keyState: {},
        gameActive: true,
        platformRadius: 10,
        ballRadius: 0.5,
        ballMass: 1,
        gravity: 10,
        animationId: null
      }
    },
    // Wykorzystujemy setup() do przechowywania obiektów Three.js poza systemem reaktywności Vue
    setup() {
      // Obiekty Three.js nie powinny być reaktywne
      const threeObjects = {
        scene: null,
        camera: null,
        renderer: null,
        platform: null,
        ball1: null,
        ball2: null,
        lights: [],
        raycaster: null
      };
      
      return {
        ...threeObjects
      };
    },
    mounted() {
      this.initThree();
      this.setupKeyListeners();
      
      // Using nextTick to ensure DOM is updated before animation starts
      this.$nextTick(() => {
        // Use shallowRef for Three.js objects
        this.animate();
      });
      
      // Handle resize
      window.addEventListener('resize', this.onWindowResize, false);
    },
    beforeUnmount() {
      // Zatrzymujemy animację przed usunięciem komponentu
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      
      // Usuwamy wszystkie event listenery
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
      
      // Zwalniamy zasoby
      this.dispose();
    },
    methods: {
      initThree() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
          75, 
          window.innerWidth / window.innerHeight, 
          0.1, 
          1000
        );
        this.camera.position.set(0, 15, 15);
        this.camera.lookAt(0, 0, 0);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.$refs.container.appendChild(this.renderer.domElement);
        
        // Add platform
        this.createPlatform();
        
        // Add players
        this.createPlayers();
        
        // Add lights
        this.addLights();
        
        // Setup raycaster for collision detection
        this.raycaster = new THREE.Raycaster();
      },
      
      createPlatform() {
        const geometry = new THREE.CylinderGeometry(this.platformRadius, this.platformRadius, 1, 32);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0x008800,
          roughness: 0.8
        });
        this.platform = new THREE.Mesh(geometry, material);
        this.platform.position.y = -0.5; // Position it below the origin
        this.platform.receiveShadow = true;
        this.scene.add(this.platform);
      },
      
      createPlayers() {
        // Player 1 (WSAD)
        const ball1Geometry = new THREE.SphereGeometry(this.ballRadius, 32, 32);
        const ball1Material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.ball1 = new THREE.Mesh(ball1Geometry, ball1Material);
        this.ball1.position.set(-5, this.ballRadius, 0);
        this.ball1.castShadow = true;
        this.ball1.userData = {
          velocity: new THREE.Vector3(0, 0, 0),
          onPlatform: true,
          player: 1
        };
        this.scene.add(this.ball1);
        
        // Player 2 (Arrow keys)
        const ball2Geometry = new THREE.SphereGeometry(this.ballRadius, 32, 32);
        const ball2Material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        this.ball2 = new THREE.Mesh(ball2Geometry, ball2Material);
        this.ball2.position.set(5, this.ballRadius, 0);
        this.ball2.castShadow = true;
        this.ball2.userData = {
          velocity: new THREE.Vector3(0, 0, 0),
          onPlatform: true,
          player: 2
        };
        this.scene.add(this.ball2);
      },
      
      addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
        this.lights.push(dirLight);
      },
      
      setupKeyListeners() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
      },
      
      onKeyDown(event) {
        this.keyState[event.code] = true;
        event.preventDefault();
      },
      
      onKeyUp(event) {
        this.keyState[event.code] = false;
        event.preventDefault();
      },
      
      handlePlayerMovement(deltaTime) {
        const acceleration = 20;
        const friction = 0.98;
        
        // Player 1 (WSAD)
        if (this.ball1.userData.onPlatform) {
          if (this.keyState['KeyW']) {
            this.ball1.userData.velocity.z -= acceleration * deltaTime;
          }
          if (this.keyState['KeyS']) {
            this.ball1.userData.velocity.z += acceleration * deltaTime;
          }
          if (this.keyState['KeyA']) {
            this.ball1.userData.velocity.x -= acceleration * deltaTime;
          }
          if (this.keyState['KeyD']) {
            this.ball1.userData.velocity.x += acceleration * deltaTime;
          }
        }
        
        // Player 2 (Arrow keys)
        if (this.ball2.userData.onPlatform) {
          if (this.keyState['ArrowUp']) {
            this.ball2.userData.velocity.z -= acceleration * deltaTime;
          }
          if (this.keyState['ArrowDown']) {
            this.ball2.userData.velocity.z += acceleration * deltaTime;
          }
          if (this.keyState['ArrowLeft']) {
            this.ball2.userData.velocity.x -= acceleration * deltaTime;
          }
          if (this.keyState['ArrowRight']) {
            this.ball2.userData.velocity.x += acceleration * deltaTime;
          }
        }
        
        // Apply friction
        this.ball1.userData.velocity.multiplyScalar(friction);
        this.ball2.userData.velocity.multiplyScalar(friction);
        
        // Apply velocity to position
        this.ball1.position.x += this.ball1.userData.velocity.x * deltaTime;
        this.ball1.position.z += this.ball1.userData.velocity.z * deltaTime;
        
        this.ball2.position.x += this.ball2.userData.velocity.x * deltaTime;
        this.ball2.position.z += this.ball2.userData.velocity.z * deltaTime;
        
        // Apply gravity if not on platform
        if (!this.ball1.userData.onPlatform) {
          this.ball1.userData.velocity.y -= this.gravity * deltaTime;
          this.ball1.position.y += this.ball1.userData.velocity.y * deltaTime;
        }
        
        if (!this.ball2.userData.onPlatform) {
          this.ball2.userData.velocity.y -= this.gravity * deltaTime;
          this.ball2.position.y += this.ball2.userData.velocity.y * deltaTime;
        }
      },
      
      checkPlatformCollision() {
        // Check if ball1 is on platform
        const distance1 = Math.sqrt(
          Math.pow(this.ball1.position.x, 2) + 
          Math.pow(this.ball1.position.z, 2)
        );
        
        if (distance1 > this.platformRadius - this.ballRadius && this.ball1.userData.onPlatform) {
          this.ball1.userData.onPlatform = false;
          // Small bounce effect when falling
          this.ball1.userData.velocity.y = 1;
        }
        
        // Check if ball2 is on platform
        const distance2 = Math.sqrt(
          Math.pow(this.ball2.position.x, 2) + 
          Math.pow(this.ball2.position.z, 2)
        );
        
        if (distance2 > this.platformRadius - this.ballRadius && this.ball2.userData.onPlatform) {
          this.ball2.userData.onPlatform = false;
          // Small bounce effect when falling
          this.ball2.userData.velocity.y = 1;
        }
        
        // Check if any player has fallen far enough to count as out
        if (this.ball1.position.y < -10 && !this.ball1.userData.onPlatform) {
          this.$emit('game-over', 2); // Player 2 wins
          this.resetGame();
        }
        
        if (this.ball2.position.y < -10 && !this.ball2.userData.onPlatform) {
          this.$emit('game-over', 1); // Player 1 wins
          this.resetGame();
        }
      },
      
      checkBallCollision() {
        // Check collision between balls
        const dx = this.ball2.position.x - this.ball1.position.x;
        const dz = this.ball2.position.z - this.ball1.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        if (distance < this.ballRadius * 2) {
          // Calculate collision response
          const angle = Math.atan2(dz, dx);
          const sine = Math.sin(angle);
          const cosine = Math.cos(angle);
          
          // Rotate velocities
          const vx1 = this.ball1.userData.velocity.x * cosine + this.ball1.userData.velocity.z * sine;
          const vz1 = this.ball1.userData.velocity.z * cosine - this.ball1.userData.velocity.x * sine;
          const vx2 = this.ball2.userData.velocity.x * cosine + this.ball2.userData.velocity.z * sine;
          const vz2 = this.ball2.userData.velocity.z * cosine - this.ball2.userData.velocity.x * sine;
          
          // Calculate new velocities (conservation of momentum)
          const finalVx1 = ((this.ballMass - this.ballMass) * vx1 + 2 * this.ballMass * vx2) / (this.ballMass + this.ballMass);
          const finalVx2 = ((this.ballMass - this.ballMass) * vx2 + 2 * this.ballMass * vx1) / (this.ballMass + this.ballMass);
          
          // Rotate back
          this.ball1.userData.velocity.x = finalVx1 * cosine - vz1 * sine;
          this.ball1.userData.velocity.z = vz1 * cosine + finalVx1 * sine;
          this.ball2.userData.velocity.x = finalVx2 * cosine - vz2 * sine;
          this.ball2.userData.velocity.z = vz2 * cosine + finalVx2 * sine;
          
          // Move balls apart to avoid sticking
          const overlap = this.ballRadius * 2 - distance;
          this.ball1.position.x -= overlap * cosine * 0.5;
          this.ball1.position.z -= overlap * sine * 0.5;
          this.ball2.position.x += overlap * cosine * 0.5;
          this.ball2.position.z += overlap * sine * 0.5;
        }
      },
      
      resetGame() {
        // Sprawdzamy czy obiekty istnieją przed dostępem do ich właściwości
        if (this.ball1 && this.ball2) {
          // Reset ball positions and velocities
          this.ball1.position.set(-5, this.ballRadius, 0);
          this.ball1.userData.velocity.set(0, 0, 0);
          this.ball1.userData.onPlatform = true;
          
          this.ball2.position.set(5, this.ballRadius, 0);
          this.ball2.userData.velocity.set(0, 0, 0);
          this.ball2.userData.onPlatform = true;
          
          // Reset game state
          this.gameActive = true;
        }
      },
      
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      
      animate() {
        // Zabezpieczamy się przed przypadkiem gdy komponenty Three.js zostały już zniszczone
        if (!this.renderer || !this.scene || !this.camera) {
          return;
        }
        
        this.animationId = requestAnimationFrame(this.animate);
        
        if (this.gameActive) {
          const deltaTime = 0.016; // roughly 60fps
          
          this.handlePlayerMovement(deltaTime);
          this.checkPlatformCollision();
          this.checkBallCollision();
        }
        
        // Renderujemy tylko jeśli wszystkie obiekty istnieją
        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }
      },
      
      dispose() {
        // Dispose geometries and materials
        if (this.platform) {
          this.platform.geometry.dispose();
          this.platform.material.dispose();
          this.scene.remove(this.platform);
        }
        
        if (this.ball1) {
          this.ball1.geometry.dispose();
          this.ball1.material.dispose();
          this.scene.remove(this.ball1);
        }
        
        if (this.ball2) {
          this.ball2.geometry.dispose();
          this.ball2.material.dispose();
          this.scene.remove(this.ball2);
        }
        
        // Remove lights
        this.lights.forEach(light => {
          this.scene.remove(light);
        });
        
        // Clear references
        this.scene = null;
        this.camera = null;
        this.platform = null;
        this.ball1 = null;
        this.ball2 = null;
        this.lights = [];
        this.raycaster = null;
      }
    }
  }
  </script>
  
  <style scoped>
  .game-container {
    width: 100%;
    height: 100%;
  }
  </style>