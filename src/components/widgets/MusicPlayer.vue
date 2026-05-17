<template>
  <div class="music-card-wrapper">
    <div class="card-title">月光留声机</div>
    <div class="music-content">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        height="52"
        src="//music.163.com/outchain/player?type=2&id=39227624&auto=0&height=32">
      </iframe>
    </div>
  </div>
</template>

<script setup>
// 目前是个纯静态的外壳展示，不需要写 JS
</script>

<style scoped>
/* 基础卡片外壳，和你的右侧边栏完美统一 */

.card-title {
  font-size: 16px;
  font-weight: bold;
  padding: 15px 20px 10px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}

.music-content {
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
