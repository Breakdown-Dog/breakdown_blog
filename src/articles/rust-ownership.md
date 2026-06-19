---
title: Rust 所有权系统深度解析
description: 理解 Rust 最核心的设计——所有权、借用与生命周期，掌握安全系统编程的关键
date: 2026-06-15
tag: Rust
---

## 为什么需要所有权？

在系统编程中，内存管理始终是核心问题。传统方案有两条路：

1. **手动管理（如 C）**：开发者 `malloc/free`，灵活但极易产生内存泄漏、悬垂指针等 bug。
2. **垃圾回收（如 Java）**：运行时自动回收，但带来暂停开销，不适合实时系统。

Rust 选择了第三条路：**所有权系统**——在编译期通过一套静态规则保证内存安全，无需 GC。

## 所有权三大规则

所有 Rust 程序都遵循以下规则：

1. 每个值在 Rust 中都有一个 **所有者**（owner）。
2. 同一时刻，一个值只能有 **一个所有者**。
3. 当所有者离开作用域，值被自动释放。

```rust
{
    let s = String::from("hello"); // s 是所有者
    // 使用 s ...
} // 作用域结束，s 被 drop，内存自动释放
```

## 移动语义

当一个值被赋给另一个变量时，所有权会 **移动**（move）：

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 的所有权移动到 s2

// println!("{}", s1); // ❌ 编译错误！s1 已失效
println!("{}", s2);   // ✅ s2 现在是所有者
```

> 移动是浅拷贝 + 所有权转移。Rust **不会** 深拷贝堆数据，因此性能开销极低。

## 借用

有时我们只想 **读** 数据而不获取所有权，此时可以使用引用（reference）：

```rust
fn calculate_length(s: &String) -> usize {  // & 表示借用
    s.len()
} // s 离开作用域，但因为是借用，不会 drop 原值

let s1 = String::from("hello");
let len = calculate_length(&s1);
println!("{} 的长度是 {}", s1, len); // ✅ s1 仍然可用
```

### 可变借用

如果需要修改借用的值，使用 `&mut`：

```rust
fn append_world(s: &mut String) {
    s.push_str(", world");
}

let mut s = String::from("hello");
append_world(&mut s);
println!("{}", s); // "hello, world"
```

### 借用规则——Rust 的编译期安全检查

- 同一时间可以有 **任意多个** 不可变引用（`&T`）
- 同一时间只能有 **一个** 可变引用（`&mut T`）
- 不可变引用和可变引用不能同时存在

```rust
let mut s = String::from("hello");

let r1 = &s;     // ✅
let r2 = &s;     // ✅
// let r3 = &mut s; // ❌ 编译错误！已有不可变引用

println!("{}, {}", r1, r2);
```

这条规则在编译期 **彻底杜绝了数据竞争**（data race）。

## 生命周期

生命周期是 Rust 用来保证 **引用不会悬垂** 的机制：

```rust
// 错误示例：返回局部变量的引用
// fn dangling() -> &String {
//     let s = String::from("hello");
//     &s
// } // s 被 drop，返回的引用指向已释放的内存 ❌
```

### 生命周期注解

当函数参数和返回值都涉及引用时，需要标注生命周期，告诉编译器它们之间的关系：

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

`'a` 表示：返回值的生命周期 **不超过** 两个参数中较短的那个。这样编译器就能静态验证返回的引用不会悬垂。

### 生命周期省略规则

好在 Rust 编译器会自动推断常见情况，大多数时候不需要手动标注：

```rust
fn first_word(s: &str) -> &str {  // 自动推断
    s.split_whitespace().next().unwrap_or("")
}
```

## 总结

| 概念 | 作用 | 阶段 |
|------|------|------|
| 所有权 | 决定谁负责释放内存 | 编译期 |
| 借用 | 允许临时访问，不转移所有权 | 编译期 |
| 生命周期 | 保证引用始终有效 | 编译期 |

这三者构成了 Rust 内存安全的基础——**零成本抽象**，所有检查都在编译期完成，运行时没有任何额外开销。
