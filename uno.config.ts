import { defineConfig, presetUno, presetAttributify, transformerDirectives, presetIcons } from 'unocss'
export default defineConfig({
    // 自定义规则
    rules: [],
    // 预设规则 有前两个预设可以满足95%以上的需求
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
    ],
    // 可以使用 @apply、@screen等指令 参考地址：https://unocss.nodejs.cn/transformers/directives
    transformers: [transformerDirectives()],
    // 个人需求添加
    shortcuts: {
        "flex-center": "flex justify-center items-center",
        "login-input": "line-height-1.5rem bg-white b-#1f293733 border-1px border-solid appearance-none",
    }
})