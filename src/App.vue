<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  background: #e9ecef; /* Matches React landing background */
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
  background-size: cover;
  animation: floatCircle 6s ease-in-out infinite;
  filter: blur(20px);
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
  z-index: 1;
}

.hero-wave {
  width: 100%;
  height: 100%;
  display: block;
  animation: waveMove 8s infinite ease-in-out, waveParallax 15s infinite linear;
}

/* Animations */
@keyframes floatCircle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

@keyframes waveMove {
  0% { transform: translateX(0); }
  50% { transform: translateX(-30px); }
  100% { transform: translateX(0); }
}

@keyframes waveParallax {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@media (max-width: 1024px) {
  .decorative-circle { width: 250px; height: 250px; }
}

@media (max-width: 768px) {
  .decorative-circle { width: 200px; height: 200px; }
}

@media (max-width: 480px) {
  .decorative-circle { width: 150px; height: 150px; }
}
</style>