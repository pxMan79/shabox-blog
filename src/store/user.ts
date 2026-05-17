import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // 注意：如果开启了 auto-import，此行可省略

export const useUserStore = defineStore("userStore", () => {
  // 1. state 对应 ref 或 reactive
  const username = ref("----");

  // 2. getters 对应 computed (计算属性具有缓存机制，依赖不变更时不会重新计算)
  const upperCaseUsername = computed(() => {
    return username.value.toUpperCase();
  });

  // 3. actions 对应普通函数
  function changeUsername(value: string) {
    if (value && value.length < 10) {
      username.value += value; // 触发 Proxy 的 set 陷阱，派发更新(Trigger)
    }
  }

  // 必须暴露出去才能被外部组件消费
  return {
    username,
    upperCaseUsername,
    changeUsername
  }
})
