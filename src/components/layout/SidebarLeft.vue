<template>
  <div>
    <ProfileCard class="side-card" />
    <TimeProbe class="side-card" />

        <TagCloud
      class="side-card"
      :selectedTags="selectedTags"
      :isMatchAll="isMatchAll"
      @toggle="$emit('toggle', $event)"
      @updateMatchAll="$emit('updateMatchAll', $event)"
    />

  </div>
</template>

<script setup>
 import ProfileCard from '@/components/widgets/ProfileCard.vue'
   import TimeProbe from '@/components/widgets/TimeProbe.vue'
   import TagCloud from '@/components/widgets/TagCloud.vue'

// 1. 接收 Home 传来的选中标签
defineProps({
  selectedTags: Array,
  isMatchAll: Boolean // 👈 新增
})

// 2. 定义向 Home 发送的信号
defineEmits(['toggle', 'updateMatchAll']) // 👈 新增
</script>

<style scoped>


</style>
