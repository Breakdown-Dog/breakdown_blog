---
title: Vue 3 Composition API 实战指南
description: 从 Options API 到 Composition API 的思维转变，以及 watch、computed、生命周期在组合式 API 中的最佳实践
date: 2026-06-12
tag: Vue
---

## 为什么需要 Composition API？

Vue 2 的 Options API 将代码按 `data`、`methods`、`computed` 等选项分割。当组件变大时，**同一个逻辑单元的代码被分散到不同的选项中**，导致可读性和复用性下降。

Composition API 允许我们按 **逻辑关注点** 组织代码，而不是按选项类型。

```vue
<script setup>
// 按功能聚合，而非按选项分割
import { ref, onMounted, watch } from 'vue'

// ---- 用户数据逻辑 ----
const user = ref(null)
const loading = ref(true)

async function fetchUser(id) {
  loading.value = true
  user.value = await api.getUser(id)
  loading.value = false
}

onMounted(() => fetchUser(props.id))

// ---- 搜索逻辑 ----
const query = ref('')
const results = ref([])

watch(query, async (val) => {
  results.value = await api.search(val)
})
</script>
```

## ref vs reactive

### ref

`ref` 包裹基本类型或对象，通过 `.value` 访问：

```javascript
import { ref } from 'vue'

const count = ref(0)
count.value++

// 模板中自动解包
// <p>{{ count }}</p>
```

### reactive

`reactive` 只接受对象，直接访问属性：

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
state.count++
```

> **原则**：优先用 `ref`，它更灵活、解构安全、类型推导更友好。`reactive` 在解构时会丢失响应性。

## computed

`computed` 返回一个只读的响应式引用：

```javascript
const price = ref(100)
const tax = ref(0.13)

const total = computed(() => price.value * (1 + tax.value))
```

也可以创建可写的 computed：

```javascript
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val) => {
    [firstName.value, lastName.value] = val.split(' ')
  },
})
```

## watch 的多种用法

### 监听单个源

```javascript
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})
```

### 监听多个源

```javascript
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count 或 name 发生了变化')
})
```

### 深度监听

```javascript
watch(() => state.obj, (newVal) => {
  console.log('obj 变化了', newVal)
}, { deep: true })
```

### watchEffect

`watchEffect` 自动追踪其内部使用的响应式依赖：

```javascript
watchEffect(() => {
  // 自动追踪 count.value
  localStorage.setItem('count', String(count.value))
})
```

## 生命周期钩子

Options API 与 Composition API 对应关系：

| Options API | Composition API |
|-------------|-----------------|
| `beforeCreate` | `setup()` 本身 |
| `created` | `setup()` 本身 |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeUnmount` | `onBeforeUnmount` |
| `unmounted` | `onUnmounted` |

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
```

## 自定义 Hook —— 逻辑复用的终极方案

把有状态逻辑提取为函数：

```javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

在组件中使用：

```vue
<script setup>
import { useMouse } from './useMouse'
const { x, y } = useMouse()
</script>

<template>
  <p>鼠标位置: {{ x }}, {{ y }}</p>
</template>
```

## 总结

Composition API 不是要取代 Options API，而是提供一个 **更灵活、更可组合** 的编写方式：

- 小/简单组件 → Options API 更直观
- 大/复杂组件 → Composition API 更清晰
- 跨组件逻辑复用 → 自定义 Hook

推荐在 **新项目中统一使用 `<script setup>` + Composition API**。
