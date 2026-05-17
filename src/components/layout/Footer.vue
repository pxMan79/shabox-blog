<template>
  <footer class="footer">
    <div class="footer-info">
      <span class="copyright">© 2026 ShaBox. All Rights Reserved.</span>
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        陕ICP备2021007284号-1
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  min-height: 60px;
  padding: 15px 0;
  color: var(--text-muted);
  background-color: var(--bg-card);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* 毛玻璃+兼容 */
  display: flex;
  align-items: center; /* 文字垂直居中 */
  justify-content: center;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* 间距 */
  font-size: 12px;
}

.footer-info a {
  text-decoration: none; /* 去掉下划线 */
  transition: color 0.3s;
}

.footer-info a:hover {
  color: #56ab2f; /* 鼠标放上去时，变成你导航栏的那种绿色 */
}

@media (min-width: 768px) {
  .footer-info {
    flex-direction: row; /* 左右横向排列 */
    gap: 20px; /* 间距 */
    font-size: 14px;
  }
}
</style>
