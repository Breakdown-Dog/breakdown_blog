<template>
  <div class="text-bloom-bg" aria-hidden="true">
    <span
      v-for="(item, i) in displayed"
      :key="i"
      class="bloom-layer"
      :style="{
        top: item.top,
        left: item.left,
        right: item.right,
        bottom: item.bottom,
        fontSize: item.fontSize,
        '--color': item.color,
        '--dur': item.dur,
        '--del': item.del,
      }"
    >
      <span class="bloom-glow" aria-hidden="true">{{ item.text }}</span>
      <span class="bloom-core">{{ item.text }}</span>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pool = [
  { text: 'GPU', color: '#ff0055' },
  { text: 'Vulkan', color: '#ff3300' },
  { text: 'DirectX', color: '#00f0ff' },
  { text: 'OpenGL', color: '#ff8800' },
  { text: 'WebGPU', color: '#5500ff' },
  { text: 'Metal', color: '#00ff88' },
  { text: 'Shader', color: '#ff00aa' },
  { text: 'Vertex', color: '#00ddff' },
  { text: 'Fragment', color: '#ff0066' },
  { text: 'Compute', color: '#44ff88' },
  { text: 'RayTrace', color: '#ffcc00' },
  { text: 'Raster', color: '#aa00ff' },
  { text: 'Mesh', color: '#0088ff' },
  { text: 'Pixel', color: '#ff00ff' },
  { text: 'Texture', color: '#00ff66' },
  { text: 'Buffer', color: '#ff4488' },
  { text: 'Pipeline', color: '#6600ff' },
  { text: 'Swapchain', color: '#00ffcc' },
  { text: 'Mat4', color: '#ff6600' },
  { text: 'Vec3', color: '#7700ff' },
  { text: 'Quat', color: '#22ffdd' },
  { text: 'Normal', color: '#0099ff' },
  { text: 'Tangent', color: '#ffbb00' },
  { text: 'UV', color: '#dd00ff' },
  { text: 'Blend', color: '#ff0077' },
  { text: 'Depth', color: '#00aaff' },
  { text: 'Stencil', color: '#ff5500' },
  { text: 'Cull', color: '#00ff44' },
  { text: 'Clip', color: '#ffaa00' },
  { text: 'HDR', color: '#ff00dd' },
  { text: 'Tonemap', color: '#4400ff' },
  { text: 'Gamma', color: '#00ff55' },
  { text: 'PBR', color: '#ff2222' },
  { text: 'BRDF', color: '#22ff44' },
  { text: 'IBL', color: '#ff0044' },
  { text: 'SSAO', color: '#00dd88' },
  { text: 'TAA', color: '#cc00ff' },
  { text: 'FXAA', color: '#ffdd00' },
  { text: 'MSAA', color: '#0066ff' },
  { text: 'Z-buffer', color: '#ff0055' },
  { text: 'Framebuf', color: '#00ff99' },
  { text: 'Viewport', color: '#9900ff' },
  { text: 'Projection', color: '#00bbff' },
  { text: 'ClipSpace', color: '#ff4400' },
  { text: 'NDC', color: '#44ff00' },
  { text: 'LOD', color: '#ff00cc' },
  { text: 'MipMap', color: '#0088ff' },
  { text: 'Sampler', color: '#ffcc22' },
  { text: 'Dispatch', color: '#2200ff' },
  { text: 'Tessellate', color: '#ff2266' },
]

const displayed = ref([])

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function pick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

onMounted(() => {
  const positions = [
    { top: '3%', left: '-3%', right: 'auto', bottom: 'auto' },
    { top: '10%', left: 'auto', right: '-2%', bottom: 'auto' },
    { top: '18%', left: '18%', right: 'auto', bottom: 'auto' },
    { top: '26%', left: 'auto', right: '8%', bottom: 'auto' },
    { top: '34%', left: '-4%', right: 'auto', bottom: 'auto' },
    { top: '42%', left: 'auto', right: '5%', bottom: 'auto' },
    { top: '50%', left: '20%', right: 'auto', bottom: 'auto' },
    { top: '58%', left: 'auto', right: '-3%', bottom: 'auto' },
    { top: '66%', left: '-2%', right: 'auto', bottom: 'auto' },
    { top: '74%', left: 'auto', right: '8%', bottom: 'auto' },
    { top: '82%', left: '12%', right: 'auto', bottom: 'auto' },
    { top: '92%', left: 'auto', right: '5%', bottom: 'auto' },
  ]

  const count = 12
  const selected = pick(pool, count)

  displayed.value = selected.map((item, i) => {
    const pos = positions[i]
    const sizes = ['clamp(2rem, 4.5vw, 4.5rem)', 'clamp(2.4rem, 5.5vw, 5.5rem)']
    return {
      text: item.text,
      color: item.color,
      top: pos.top,
      left: pos.left,
      right: pos.right,
      bottom: pos.bottom,
      fontSize: sizes[i % sizes.length],
      dur: `${rand(22, 30).toFixed(0)}s`,
      del: `${rand(-18, 0).toFixed(0)}s`,
    }
  })
})
</script>

<style scoped>
.text-bloom-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #06060a;
  pointer-events: none;
}

.bloom-layer {
  position: absolute;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
  will-change: transform;
  animation: bloom-drift ease-in-out infinite alternate;
  animation-duration: var(--dur, 24s);
  animation-delay: var(--del, 0s);
  filter: brightness(1.6) saturate(1.4);
}

.bloom-glow {
  position: absolute;
  inset: 0;
  filter: blur(40px) saturate(2);
  color: var(--color);
  opacity: 0.9;
  mix-blend-mode: color-dodge;
}

.bloom-core {
  position: relative;
  color: #fff;
  opacity: 0.55;
  text-shadow:
    0 0 5px #fff,
    0 0 15px rgba(255, 255, 255, 0.5),
    0 0 40px var(--color),
    0 0 80px var(--color),
    0 0 120px var(--color);
}

@keyframes bloom-drift {
  0%   { transform: translate(0, 0); }
  33%  { transform: translate(30px, -20px); }
  66%  { transform: translate(-20px, 20px); }
  100% { transform: translate(-25px, -10px); }
}
</style>
