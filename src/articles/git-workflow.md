---
title: Git 工作流最佳实践
description: 掌握 Git Flow、GitHub Flow、Trunk-based 等主流工作流，以及交互式 rebase、commit 规范等工程实践
date: 2026-06-05
tag: 工具
---

## 为什么需要工作流？

Git 是个强大的工具，但自由度过大反而容易混乱。工作流是团队约定的一套 **协作规范**，目的是：

- 减少合并冲突
- 保持提交历史清晰
- CI/CD 顺畅运行
- 代码审查高效

## 主流工作流对比

### GitHub Flow（推荐）

最简单且最流行的工作流：

```
main ──●────●────●────●────●
         \        /
feature   ●──●──●
```

**规则**：
1. `main` 分支始终保持可部署状态
2. 新功能从 `main` 开分支
3. 提交到 feature 分支，频繁推送
4. 通过 Pull Request 发起代码审查
5. 合并回 `main` 后立即部署

**适合**：持续部署的团队、中小型项目。

### Git Flow

更严谨的"版本发布"工作流：

```
develop ──●────●────●────●────────●
               \         /         \
feature         ●──●──●            ●── hotfix
                 \         /
release           ●──●──●
```

**分支类型**：
| 分支 | 用途 |
|------|------|
| `main` | 生产就绪，每个 commit 对应一次发布 |
| `develop` | 日常开发集成分支 |
| `feature/*` | 新功能开发 |
| `release/*` | 发布前准备（bug 修复、版本号） |
| `hotfix/*` | 紧急生产修复 |

**适合**：有版本发布周期的项目、需要同时维护多个版本。

### Trunk-based Development

Google、Facebook 等大型团队采用的方式：

```
main ──●──●──●──●──●──●──●──●──●
         \ /        \ /
short-lived ●        ●
```

**规则**：
- 所有开发者直接向 `main`（或 `trunk`）推送小提交
- 分支存活时间不超过 1-2 天
- 必须搭配 Feature Toggle（特性开关）

## Commit Message 规范

推荐使用 [Conventional Commits](https://www.conventionalcommits.org/) 标准：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### 类型对照

| Type | 含义 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `refactor` | 重构（非功能、非修复） |
| `test` | 测试相关 |
| `chore` | 构建/工具/依赖变更 |

### 示例

```
feat(auth): 添加 OAuth2 登录支持

实现 GitHub 和 Google OAuth2 登录流程。
添加 Session 管理和 Token 刷新。

Closes #42
```

## 交互式 Rebase —— 保持历史整洁

在 PR 合并前，使用 rebase 整理提交：

```bash
# 将最近 3 个提交合并为 1 个
git rebase -i HEAD~3
```

交互界面：

```
pick a1b2c3  feat: 添加登录页面
pick d4e5f6  fix: 修复登录按钮样式
pick g7h8i9  fix: 修复移动端布局

# 改成：
pick a1b2c3  feat: 添加登录页面
fixup d4e5f6  # 合并到上一个 commit
fixup g7h8i9  # 合并到上一个 commit
```

结果：3 个零散的 commit 变成 1 个语义清晰的 commit。

> ⚠️ **不要 rebase 已经推送到公共分支的 commit**。

## 实用技巧

### 1. 自动修正上次提交

```bash
git commit --amend --no-edit
```

### 2. 交互式暂存

```bash
git add -p  # 逐个块确认暂存
```

### 3. 查找回归

```bash
git bisect start
git bisect bad      # 当前版本有问题
git bisect good v1.0  # v1.0 是好的
# Git 会二分查找，帮你定位首个坏提交
```

### 4. 日志可视化

```bash
git log --graph --oneline --all --decorate
```

## 推荐配置

```bash
# 全局配置
git config --global pull.rebase true     # pull 用 rebase 而非 merge
git config --global rebase.autoStash true
git config --global core.autocrlf input  # 避免换行符问题
```

## 总结

| 工作流 | 复杂度 | 适用场景 |
|--------|--------|----------|
| GitHub Flow | ⭐ | 大多数团队，持续部署 |
| Git Flow | ⭐⭐⭐ | 版本发布型项目 |
| Trunk-based | ⭐⭐ | 大型团队，Feature Toggle |

无论选择哪种工作流，**一致性比完美更重要**——整个团队遵守同一套规则。
