<!-- # 置顶精选小组件 -->
 <template>
  <div class="pinned-card-wrapper">
    <div class="card-title">精选记忆</div>
    <div class="pinned-list">
      <div
        class="pinned-item"
        v-for="post in pinnedPosts"
        :key="'pinned-' + post.id"
        @click="router.push(`/post/${post.id}`)"
      >
        <div class="pinned-img">
          <img :src="getOssSquare (post.img, 100, 100)" alt="cover" />
        </div>
        <div class="pinned-info">
          <h4>{{ post.title }}</h4>
          <p>{{ post.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '@/data/posts.js' // 直接从仓库调取数据
import { getOssSquare  } from '@/utils/oss.js' // 👈 引入工具函数

const router = useRouter()

// 全新魔法：只挑出被你盖了 `pinned: true` 印章的帖子！
// （后面保留了 .slice(0, 3) 是一道安全锁，防止你以后不小心置顶了 10 篇，导致边栏被撑爆，它永远只展示最新的 3 篇置顶）
const pinnedPosts = computed(() => {
  return postData.filter(post => post.pinned).slice(0, 5)
})

</script>

<style scoped>
/* 基础卡片外壳 */
.card-title {
  font-size: 16px;
  font-weight: bold;
  padding: 15px 20px 10px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}
/* 精选列表专属样式 */
.pinned-list {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.pinned-item {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pinned-item:hover {
  transform: translateX(5px);
}
.pinned-img {
  width: 45px;
  height: 45px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}
.pinned-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pinned-info h4 {
  font-size: 14px;
  margin: 0 0 4px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}
.pinned-info p {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
