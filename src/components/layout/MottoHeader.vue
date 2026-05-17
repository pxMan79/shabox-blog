<template>
  <div class="motto-header">
    <a v-if="showBack" @click="goBack" class="back-btn">
      <span class="arrow">←</span> 返回
    </a>

    <p
      v-show="isMounted"
      class="motto-text"
      @click="toggleDarkMode"
      title="点击切换昼夜"
    >
      {{ isDark ? darkText : lightText }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


// 接收父组件传来的返回按钮指令（文字我们现在由组件自己接管了，不需要父组件传了！）
defineProps({
  showBack: {
    type: Boolean,
    default: false,
  },
  // 👇 新增两个指令：允许外部定义文案。如果不传，就用这里的默认值！
  darkText: {
    type: String,
    default: "🌙 月光如梦",
  },
  lightText: {
    type: String,
    default: "☀️ 晨光微熹",
  },
});
const router = useRouter()
const goBack = () => router.push('/')


// =========================================
// 昼夜交替的魔法引擎
// =========================================
const isDark = ref(true)
const isMounted = ref(false) // 新增：客户端挂载追踪器


// 页面加载时，先看看当前是不是黑夜，保证刷新后状态不丢
onMounted(() => {
  // 此时处于客户端，可以安全读取 DOM
  isDark.value = document.documentElement.classList.contains('dark')
  // 标记挂载完成，触发 v-show 显示正确文案
  isMounted.value = true
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  // 拨动全局开关
  document.documentElement.classList.toggle("dark", isDark.value);
  // 顺手把状态存进浏览器的记忆里，下次打开网站还是这个模式
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};
</script>

<style scoped>
.motto-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.back-btn {
  position: absolute;
  left: 0;
  font-size: 15px;
  color: var(--text-muted); /* 换肤魔法代词 */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
}
.back-btn:hover {
  color: #56ab2f;
  transform: translateX(-4px);
}
.back-btn .arrow {
  font-size: 18px;
  margin-bottom: 2px;
}

/* ========================================= */
/* 诗词开关的视觉魔法 */
/* ========================================= */
.motto-text {
  font-family: "KaiTi", "楷体", serif;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 6px;
  margin: 0;
  cursor: pointer; /* 鼠标放上去变成小手，暗示可以点击 */
  user-select: none;
  transition: all 0.4s ease;

  /* 默认（白天）的光影：极其温柔的米黄色发光 */
  color: #fff9d6;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.4);
}

/* 悬停时的呼吸感：暗示这是一个交互按钮 */
.motto-text:hover {
  transform: scale(1.05);
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 0 15px rgba(255, 215, 0, 1),
    0 0 30px rgba(255, 215, 0, 0.6);
}

/* 当整个网页进入黑夜模式时，诗句的光影也要跟着变冷！ */
:global(html.dark) .motto-text {
  color: #e0f2fe; /* 偏冷的月光白 */
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.5),
    0 0 1px rgba(56, 189, 248, 0.8),
    0 0 3px rgba(56, 189, 248, 0.4);
}
</style>
