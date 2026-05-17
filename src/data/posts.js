// src/data/posts.js 顶部新增引入
import { defineAsyncComponent } from "vue";
// 1. 移除 eager: true，采用动态导入生成 Promise 工厂函数
// 此时 markdownFiles 的值为: { '/src/posts/diyi.md': () => import('/src/posts/diyi.md') }
const markdownFiles = import.meta.glob("/src/posts/*.md");

// 由于移除了 eager，我们无法在构建模块时同步获取文件内的 frontmatter。
// 针对你目前的架构，若必须同步生成文章列表，这是暂时的妥协写法（保留 eager: true 以提取标题/标签）：
// 【警告】：长远来看，必须将 Markdown 的元数据抽离为独立的 JSON 或通过接口请求，绝对不可将全量 md 文件塞入前端源码。

const eagerFiles = import.meta.glob("/src/posts/*.md", { eager: true });

export const postData = Object.keys(eagerFiles)
  .map((path) => {
    const module = eagerFiles[path];

    // 采用 V8 底层指针偏移，摒弃 replace
    const filename = path.split("/").pop().slice(0, -3);
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    const extractedDate = match ? match[1].replace(/-/g, "/") : null;
    const cleanId = match ? match[2] : filename;
    const rawTag = module.tag || "默认";
    const tagArray = Array.isArray(rawTag)
      ? rawTag
      : rawTag.split(",").map((t) => t.trim());

    function resolveImg(path) {
      if (!path) return "";

      // 1. Windows 绝对路径
      if (/^[a-zA-Z]:\\/.test(path)) return path;

      // 2. @ alias（vite webpack 风格）
      if (path.startsWith("@/")) return path;

      // 3. 线上 OSS / 静态资源（你统一规则）
      if (path.startsWith("/")) return `${__CDN__}${path}`;

      // 4. 其他情况（兜底）
      return path;
    }

    const rawImg = module.img || "";
    const finalImg = resolveImg(rawImg);

    // 2. 相册数组批量映射（遍历数组，给每一个元素打上 CDN 思想钢印）
    const rawGallery = module.gallery || [];

    // 🚀 【合并逻辑】：在此处注入自动序列发生器
    if (module.gallery_dir && module.gallery_count !== undefined) {
      const dir = module.gallery_dir.replace(/\/$/, '');
      for (let i = 0; i <= module.gallery_count; i++) {
        const numStr = i.toString().padStart(2, '0');
        rawGallery.push(`${dir}/${numStr}.webp`);
      }
    }

    const finalGallery = rawGallery.map(resolveImg);
    return {
      id: cleanId,
      title: module.title || "无标题",
      date: module.date || extractedDate || "未知时间",
      tag: tagArray,
      quote: module.quote || "",
      img: finalImg,
      pinned: module.pinned === true,
      gallery: finalGallery,
      coverType: module.coverType || "image",
      coverData: module.coverData || null,
      // 【核心修正】：组件剥离为懒加载的异步函数 (Async Component Factory)
      // 这将使得 Rollup 把每篇 Markdown 单独打包成一个 .js 文件，仅在路由跳转时按需请求！
      // 👇 核心修正：包裹为真正的异步组件
      component: defineAsyncComponent(markdownFiles[path]),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
