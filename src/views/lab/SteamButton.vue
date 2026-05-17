<template>
  <Teleport to="body" :disabled="!isExpanded">
    <div
      class="lab-wrapper"
      :class="{ inline: !isExpanded, fullscreen: isExpanded }"
      @click="handleWrapperClick"
    >
      <div class="scene">
        <div class="steamVM">
          <div class="numberVM">
            <div class="pctVM"><span>-100%</span></div>
            <div class="priceVM">
              <div class="topVM"><span>¥100.00</span></div>
              <div class="bottomVM">¥0.00</div>
            </div>
          </div>
          <input type="button" value="添加到账户" @click="showPopup = true" />
        </div>

        <transition name="fade">
          <div
            v-if="showPopup"
            class="popLayer"
            @click="showPopup = false"
          ></div>
        </transition>

        <transition name="pop">
          <div v-if="showPopup" class="popBox">
            <div class="close">
              <a href="#" @click.prevent="showPopup = false">关闭</a>
            </div>
            TMD老子一拳一个白嫖怪
          </div>
        </transition>
      </div>

      <transition name="fade">
        <div class="controls-overlay" v-if="isExpanded" @click.stop>
          <a class="back-btn" @click="closeFullscreen">< 返回帖子</a>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";

// 1. 架构级状态：控制传送门与形态切换
const isExpanded = ref(false);

// 2. 业务级状态：控制 Steam 弹窗
const showPopup = ref(false);

// 拦截逻辑：内嵌状态下，点击整个卡片触发全屏
const handleWrapperClick = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    document.body.style.overflow = "hidden"; // 锁定底层网页滚动
  }
};

// 退出逻辑：关闭全屏，必须同时重置业务状态（关闭可能开着的弹窗）
const closeFullscreen = () => {
  isExpanded.value = false;
  showPopup.value = false; // 严谨的内存清理：退出时把弹窗也关掉
  document.body.style.overflow = ""; // 解除底层滚动锁定
};
</script>

<style scoped>
/* =======================================================
   1. 样式清洗舱 (CSS Reset Shield)
   ======================================================= */
.lab-wrapper * {
  text-indent: 0 !important;
  margin: 0;
  padding: 0;
  line-height: normal;
  letter-spacing: normal;
  box-sizing: border-box;
}

/* =======================================================
   2. 基础容器骨架与传送门双态
   ======================================================= */
.lab-wrapper {
  position: relative;
  background: #1b2838;
  overflow: hidden;
  transition: all 0.4s ease;
}

.scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lab-wrapper.inline {
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: 10px;
  cursor: zoom-in;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.lab-wrapper.inline .scene {
  pointer-events: none;
}

.lab-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  cursor: default;
}

/* =======================================================
   3. 业务组件核心 CSS (重构 Flex 布局)
   ======================================================= */
.steamVM {
  width: 90%;
  max-width: 600px;
  height: 90px;
  text-align: center;
  background-color: #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.numberVM {
  flex: 6;
  height: 86%;
  margin-left: 1%;
  display: flex;
}
.pctVM {
  width: 60%;
  height: 100%;
  font-size: clamp(24px, 5vw, 65px);
  color: #a4d007;
  background-color: #4c6b22;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 【核心修复区】：摒弃 topVM 的 absolute，改用纯粹的 Flex 列向居中 */
.priceVM {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 纵向绝对居中 */
  align-items: center; /* 横向绝对居中 */
  gap: 2px; /* 利用 gap 属性精准控制上下两行字的间距 */
}

/* 去掉多余的 flex:1 和 absolute，让文本回归自然文档流 */
.topVM {
  width: 100%;
}
.topVM span {
  font-size: clamp(12px, 3vw, 32px);
  color: #626366;
  text-decoration: line-through;
  line-height: 1; /* 收紧行高，使 gap 控制更精确 */
}

.bottomVM {
  width: 100%;
  font-size: clamp(16px, 4vw, 40px);
  color: #99ccff;
  line-height: 1;
}

/* =======================================================
   4. 按钮与弹窗交互
   ======================================================= */
.steamVM input {
  flex: 4;
  height: 86%;
  margin: 0 1%;
  color: #cfeda6;
  font-size: clamp(16px, 3vw, 40px);
  text-shadow: 1px 1px 2px #426514;
  background-color: #73ad21;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.steamVM input:hover {
  color: #fff;
  text-shadow: #5b8a1b;
  background-color: #8ed629;
}

.popLayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  pointer-events: auto;
}
.popBox {
  position: absolute;
  z-index: 11;
  pointer-events: auto;
  width: 80%;
  max-width: 800px;
  height: 60%;
  max-height: 400px;
  border: 4px solid #fff;
  border-radius: 10px;
  font-size: clamp(20px, 4vw, 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #214d6f;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}
.close a {
  position: absolute;
  bottom: 15px;
  right: 25px;
  text-decoration: none;
  font-size: 18px;
  color: #9a9a9a;
  transition: color 0.2s;
}
.close a:hover {
  color: #fff;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* =======================================================
   5. UI 控制台样式 (全屏退出按钮)
   ======================================================= */
.controls-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  pointer-events: none;
}
.back-btn {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.3s;
}
.back-btn:hover {
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
