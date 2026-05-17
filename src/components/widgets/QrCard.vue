<template>
  <div class="qr-card">
    <div class="qr-item">
      <h3>QQ群 <span>加入我们</span></h3>
      <img :src="`${__CDN__}/@system/icons/qqqqr.webp`" alt="QQ群" />
    </div>
    <div class="qr-item">
      <h3>微信 <span>pxMan79</span></h3>
      <img :src="`${__CDN__}/@system/icons/wxqr.webp`" alt="微信" />
    </div>
  </div>
</template>

<script setup>
// 纯静态展示，无须逻辑
</script>

<style scoped>
/* 补全基础卡片样式，它现在是个完全独立的模块了 */
.qr-card {
  background-color: var(--bg-card);
  color: var(--text-main);
  box-shadow: 0 2px 8px var(--card-shadow);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  padding: 20px 10px;
  transition: all 0.4s ease;
}
.qr-item {
  width: 40%;
  text-align: center;
   /* 魔法 1：让包裹着标题和图片的盒子，自己也变成一个弹性列！ */
  display: flex;
  flex-direction: column;
}
.qr-item h3 {
  /* 魔法 2：吸水海绵！让标题吸收掉上面所有的多余空间，强行保证左右两边的 h3 绝对等高！ */
  flex: 1;
  /* 魔法 3：让文字乖乖沉底对齐 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 不管是几行字，统统往下靠，贴紧那条底边框！ */
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 5px;
  transition: border-color 0.4s ease;
}
.qr-item h3 span {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: normal;
  transition: color 0.4s ease;
}
.qr-item img {
  width: 100%;
  border-radius: 8px;
}
</style>
