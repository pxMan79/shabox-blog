// src/env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 欺骗 TS 编译器：所有 .vue 文件导出的都是一个 Vue 组件实例
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 👇 新增：向 TS 编译器注册全局常量
declare const __CDN__: string;
// src/vite-env.d.ts 尾部追加
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    __CDN__: string;
  }
}
