<!-- # 个人名片小组件 -->
<template>
  <div class="profile-card">
    <div class="header-bg">
      <img
        :src="`${__CDN__}/@system/bg/rc.webp`"
        alt="bg"
        class="bg-img"
      />
      <div class="user" @click="router.push('/about')">
        <img
          src="@/assets/icons/xsr3.svg"
          alt="user"
        />
      </div>
    </div>
    <!-- 👇 魔法包装盒：专门用来吸收多余的高度的海绵 -->
    <div class="profile-info">
      <h3 class="author-name">pxMan79</h3>
      <p class="author-subname">像素人柒玖</p>
    </div>
    <div class="link">
      <a
        href="https://qm.qq.com/cgi-bin/qm/qr?k=keb2W_pvdq0JmFL52mGOjjLCLSHEgMvB&noverify=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="@/assets/icons/qqlink.svg"
          alt="qq"
        />
      </a>
      <a
        href="https://space.bilibili.com/367471591?spm_id_from=333.999.0.0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="@/assets/icons/blink.svg"
          alt="bilibili"
        />
      </a>
      <a
        href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=WSkhNDg3bmpoYBkoKHc6NjQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="@/assets/icons/yxlink.svg"
          alt="email"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
/* 这里只放属于名片的样式，别的都不要 */
/* 1. 允许整个卡片在 About 页被拉伸时，内部跟着响应 */
.profile-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header-bg {
  position: relative;
  width: 100%;
}
.bg-img {
  width: 100%;
  display: block;
}
.user {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 3;
}
.user img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 50%;
  box-shadow:
    0 0 5px #5c7b1e,
    0 0 3px #d8ff46;
  transition: all 0.3s ease-out;
  cursor: pointer;
}
.user img:hover {
  transform: rotate(360deg) scale(1.2);
}

/* 2. 核心魔法：吸收空间的“海绵” */
.profile-info {
  flex: 1; /* 榨干拉伸后产生的所有多余空间 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 让里面的名字绝对垂直居中！ */
  padding-top: 55px; /* 把原来写在名字上的 margin-top 挪到这里，给头像留出位置 */
  padding-bottom: 10px; /* 稍微给一点底部呼吸感 */
}
.author-name {
  font-size: 22px;
  text-align: center;
  font-weight: bold;
}
.author-subname {
  font-family: "KaiTi", "楷体", serif;
  font-weight: bold;
  font-size: 14px;
  color: var(--text-muted);
  text-align: center;
  margin-top: 4px;
  letter-spacing: 2px;
}

.link {
  display: flex;
  width: 80%;
   /* 魔法：margin-top: auto 会自动把上面的元素推开，保证自己永远贴着卡片底部！留出 20px 的底边距 */
  margin: auto;
  justify-content: space-around;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(to left, #a8e063, #56ab2f);
  padding: 5px 0;
}
.link a {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link img {
  width: 60%;
  transition: all 0.2s ease-out;
  cursor: pointer;
}
.link img:hover {
  transform: scale(0.8);
}
</style>
