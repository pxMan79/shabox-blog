<template>
  <transition name="fade">
    <div class="lightbox-overlay" v-if="show" @click.self="close">
      <button class="close-btn" @click="close" title="关闭 (Esc)">×</button>

      <button class="nav-btn prev-btn" @click.stop="prev" v-if="images.length > 1" title="上一张 (←)">❮</button>
      <button class="nav-btn next-btn" @click.stop="next" v-if="images.length > 1" title="下一张 (→)">❯</button>

      <div class="image-wrapper" @click.self="close">
        <img :src="images[currentIndex]" alt="enlarged-img" class="hd-img" />
      </div>

      <div class="bottom-bar">
        <span class="counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        <button class="goto-post-btn" @click="goToPost">
          前往所属帖子 →
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  show: Boolean,         // 开关
  images: Array,         // 图片数组（原图）
  startIndex: Number,    // 点击的是第几张
  postId: String         // 所属帖子的 ID
})

const emit = defineEmits(['close'])
const router = useRouter()

const currentIndex = ref(0)

// 每次打开暗房时，把当前图片对准你点击的那一张
watch(() => props.show, (newVal) => {
  if (newVal) currentIndex.value = props.startIndex
})

// 基础操作逻辑
const close = () => emit('close')
// 魔法：取余算法实现无限循环轮播
const prev = () => { currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length }
const next = () => { currentIndex.value = (currentIndex.value + 1) % props.images.length }

const goToPost = () => {
  close() // 先关灯
  router.push(`/post/${props.postId}`) // 再跳转
}

// 极客交互：监听键盘快捷键
const handleKeydown = (e) => {
  if (!props.show) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
/* 终极暗房幕布 */
.lightbox-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.85); /* 极暗背景 */
  backdrop-filter: blur(5px); /* 极其高级的毛玻璃虚化 */
  z-index: 9999; /* 保证它盖住全站所有东西 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 渐隐渐现动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 核心图片控制 */
.image-wrapper {
  position: relative;
  width: 90vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hd-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 保证整张图完整显示，绝不裁剪 */
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

/* UI 按钮群 */
.close-btn {
  position: absolute; top: 20px; right: 30px;
  background: none; border: none;
  color: #fff; font-size: 40px; cursor: pointer;
  transition: transform 0.3s; z-index: 2;
}
.close-btn:hover { transform: scale(1.2); color: #56ab2f; }

.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.1); border: none;
  color: #fff; font-size: 30px; padding: 15px 10px;
  cursor: pointer; transition: all 0.3s; z-index: 2;
  border-radius: 8px; backdrop-filter: blur(4px);
}
.nav-btn:hover { background: rgba(255,255,255,0.3); }
.prev-btn { left: 20px; }
.next-btn { right: 20px; }

/* 底部功能栏 */
.bottom-bar {
  position: absolute; bottom: 30px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.counter { color: #aaa; font-family: monospace; font-size: 14px; letter-spacing: 2px;}
.goto-post-btn {
  background: linear-gradient(145deg, #80c934, #6ca92c);
  color: #fff; border: none; padding: 8px 20px;
  border-radius: 20px; font-weight: bold; cursor: pointer;
  box-shadow: 0 4px 10px rgba(86,171,47,0.4);
  transition: all 0.3s;
}
.goto-post-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(86,171,47,0.6); }
</style>
