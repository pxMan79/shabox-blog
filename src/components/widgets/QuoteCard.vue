<template>
  <div class="quote-card-wrapper" @click="changeQuote" title="点击切换下一句">
    <div class="card-title">碎碎念</div>

    <div class="quote-content">
      <p
        class="quote-text"
        @click.stop="copyQuote"
        title="点击复制这段话"
      >
        {{ currentQuote }}
      </p>

      <transition name="fade">
        <span v-if="showCopied" class="copy-toast">已复制到剪贴板 ✨</span>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { quoteLibrary } from '@/data/quotes.js'

const currentQuote = ref('')
const showCopied = ref(false) // 控制“已复制”提示的开关

// =========================================
// 魔法 1：极其聪明的“换一句”引擎（防重复机制）
// =========================================
const changeQuote = () => {
  let newQuote = currentQuote.value
  // 如果随机抽到的句子和当前句子一样，就一直重新抽，直到抽到不一样的为止！
  while (newQuote === currentQuote.value && quoteLibrary.length > 1) {
    newQuote = quoteLibrary[Math.floor(Math.random() * quoteLibrary.length)]
  }
  currentQuote.value = newQuote
}

// =========================================
// 魔法 2：现代浏览器的“一键复制”接口
// =========================================
const copyQuote = async () => {
  try {
    // 调用现代浏览器底层的剪贴板 API
    await navigator.clipboard.writeText(currentQuote.value)

    // 显示“已复制”提示
    showCopied.value = true

    // 2秒后自动隐藏提示，绝不打扰用户
    setTimeout(() => {
      showCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('哎呀，复制失败了', err)
  }
}

// 页面刚加载时，先抽第一句话
onMounted(() => {
  changeQuote()
})
</script>

<style scoped>
/* 基础卡片外壳 */
.quote-card-wrapper {
  cursor: pointer; /* 告诉用户整个卡片都是可以点的 */
  position: relative;
  /* 👇 注入拉伸灵魂 */
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 鼠标放上去时给个轻微的浮起感，暗示可点击 */
.quote-card-wrapper:hover {
  box-shadow: 0 4px 2px #a8e063;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  padding: 15px 20px 10px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}

.quote-content {
  position: relative;
  padding: 30px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* ========================================= */
/* 视觉抽离魔法：把引号变成高级的悬浮装饰 */
/* ========================================= */
.quote-content::before {
  content: "❝";
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 35px; /* 放大一点，作为图形点缀 */
  color: #a8e063; /* 淡淡的主题绿，极具高级感 */
  font-family: serif;
  pointer-events: none; /* 防止挡住鼠标点击 */
}

.quote-content::after {
  content: "❞";
  position: absolute;
  bottom: 0px;
  right: 20px;
  font-size: 35px;
  color: #a8e063;
  font-family: serif;
  pointer-events: none;
}

/* 语录文字的专属交互样式 */
.quote-text {
  font-family: "KaiTi", "楷体", serif;
  font-size: 16px;
  color: var(--text-main); /* 替换掉 #555 */
  line-height: 1.8;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: pre-line;
}

/* 鼠标停在文字上时，给个极其微弱的背景色，暗示它可以被单独操作（复制） */
.quote-text:hover {
  background-color: rgba(86, 171, 47, 0.1);
  color: #56ab2f;
}

/* ========================================= */
/* 极客细节：复制成功的小气泡动画 */
/* ========================================= */
.copy-toast {
  position: absolute;
  bottom: 5px;
  font-size: 12px;
  color: #56ab2f;
  background-color: var(--article-bg);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: normal;
}

/* Vue 专属的渐隐渐现动画魔法 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
