<template>
  <div class="info-card log-card">
    <h2>更新日志</h2>
    <div class="log-content">
      <ul class="timeline">
        <li v-for="log in changelog" :key="log.date">
          <span class="log-date">{{ log.date }}</span>
          <span class="log-text">{{ log.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 👇 召唤你刚刚建好的数据仓库
import { changelog } from "@/data/changelog.js";
</script>

<style scoped>
/* 补全基础卡片与换肤样式，保证它放在任何页面都很美 */
.info-card {
  background-color: var(--bg-card);
  color: var(--text-main);
  box-shadow: 0 2px 8px var(--card-shadow);
  border-radius: 10px;
  padding: 20px;
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

/* === 原有更新日志与水印样式 === */
.log-card {
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden; /* 防止水印溢出卡片 */
}
.log-card::after {
  content: "";
  position: absolute;
  right: 2%;
  bottom: -5%;
  width: 150px;
  height: 150px;
  /* 恢复你的头像水印，如果你存了 xsr.svg 也可以换回去 */
  background: url(@/assets/icons/xsr.svg) no-repeat center;
  background-size: contain;
  opacity: 0.5;
  pointer-events: none;
}
.timeline {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 10px;
  border-left: 2px solid #a8e063;
}
.timeline li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 20px;
}
.timeline li::before {
  content: "";
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #d8ff46;
  border: 2px solid #56ab2f;
  box-shadow: 0 0 4px rgba(86, 171, 47, 0.5);
}
.log-date {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #56ab2f;
  margin-bottom: 5px;
}
.log-text {
  font-size: 15px;
  color: var(--text-main);
  line-height: 1.6;
  transition: color 0.4s ease;
}
</style>
