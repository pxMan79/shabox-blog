<template>
  <div class="info-card">
    <h2>{{ title }}</h2>

    <div
      class="text-bg"
      :style="{ backgroundImage: `url(${bgImage})` }"
      :data-watermark="watermark"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// 接收父组件下达的 3 个指令
defineProps({
  title: { type: String, required: true },      // 卡片标题
  bgImage: { type: String, required: true },    // 背景图片链接
  watermark: { type: String, default: '' }      // 右下角的暗纹水印（比如 ❝ 或 ✦）
})
</script>

<style scoped>
/* 1. 基础卡片外壳 */
.info-card {
  background-color: var(--bg-card);
  color: var(--text-main);
  box-shadow: 0 2px 8px var(--card-shadow);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
}
.info-card h2 {
  font-size: 20px;
  line-height: 40px;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 15px;
  text-align: center;
  transition: border-color 0.4s ease;
}

/* 2. 毛玻璃图片容器 */
.text-bg {
  position: relative;
  z-index: 1;
  border-radius: 10px;
  padding: 20px 8%;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  flex: 1; /* 自动撑满剩余高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 内部文字绝对垂直居中 */
}

/* 3. 神级黑科技：利用 attr() 读取 HTML 里的 data-watermark 属性作为水印内容！ */
.text-bg::after {
  content: attr(data-watermark);
  position: absolute;
  bottom: -5%;
  right: 5%;
  font-size: 160px;
  color: #a8e063;
  font-family: serif;
  z-index: -1;
  pointer-events: none;
  line-height: 1;
}

/* ========================================= */
/* 4. 插槽样式魔法：使用 :slotted() 穿透作用域 */
/* 专门用来给外面塞进来的富文本穿衣服！ */
/* ========================================= */
.text-bg :slotted(p) {
  color: #fff;
  margin-bottom: 15px;
  line-height: 24px;
  text-indent: 2em;
  backdrop-filter: blur(2px);
}
.text-bg :slotted(.id-card) {
  color: #fff;
  text-align: center;
  text-indent: 0;
  font-size: 18px;
  line-height: 30px;
}
.text-bg :slotted(strong) {
  color: yellowgreen;
}
.text-bg :slotted(em) {
  color: #fff;
  font-style: italic;
}
</style>
