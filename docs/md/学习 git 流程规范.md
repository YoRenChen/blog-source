---
title: 学习 git 流程规范
date: 2020-08-20
---

# Git 分支策略

为了保持 git graph 和 git logs 的整洁，并且我们的团队不大，将采取 pull --rebase 和 merge --ff-only 的方式合并代码

## Feature 开发流程

![](/images/git.png)

以模组为例，现在需要正式进入 MOMGT-903 的开发工作

VSCode 可以安装 Jira 插件 辅助开发

### 第一步，从主分支 (mmpdev) 创建一个名为 MOMGT-903-[summary] 的 feature 分支，如：

git checkout -b MOMGT-903-【客户平台】列表操作一致性

### 第二步，开发卡片对应的功能

开发过程中遵循“每完成一个功能点就 commit 一次代码”的原则，绝大多数情况下，一个卡片只对应一个功能点

如果因为某些原因破坏了 git log 的清晰结构(commit message 与实际代码不符、单个功能存在多次 commit 等)，需要及时进行 rebase 处理

如果该 feature 分支持续时间很长(注意，这不是一个健康的模式)，需要及时地 forward integrate (FI) ，具体操作是把 mmpdev 分支 rebase 到当前 feature 分支

### 第三步，集成到 QA 环境

只需要提交 MR 把该 feature 分支合并到主分支 (mmpdev) , CI 会自动将其集成到 QA 环境

提交 MR 前应该确保代码已通过本地开发环境冒烟自测，避免后续多次提交导致 git logs 混乱以及浪费 MR Reviewer 的时间

存在两次冒烟自测：一次是自己开发完成后在本地环境自测，保证当前所写的代码没有问题；另一次是代码合并发布到 QA 环境后的自测，保证当前代码 集成到主干后也没有问题。

merge 前需要再次 rebase 主分支，存在 behind commit 时 MR Reviewer 会拒绝此次 MR

GItLab MR 默认采取的是 --no-ff 方式，会在每次合并时创建一个合并 commit，需要改成 fast forward 模式

一个 sprint 一般存在多个车次，只有下趟发车内容包含当前卡片时才能将卡片对应的 feature 分支合并到主分支 (mmpdev)

### 第四步，发布

参考https://aylaasia.atlassian.net/wiki/spaces/RDCEN/pages/2023784594 以及 https://aylaasia.atlassian.net/wiki/spaces/RDCEN/pages/2115305809

### Bugfix 流程

在整个研发流程中，存在两种 bugfix 流程：

1. 线上 prod 环境的 bugfix

2. 非线上 prod 环境的 bug 的修复，包括 QA 环境的 bug、stage 环境的 bugfix

#### 线上 prod 环境的 bugfix

线上 prod 环境的 bug 都会有对应的 Jira Issue 卡片，流程跟普通 feature 开发相似，不同点在于 merge 到主分支后需要再将该 hotfix 分支合并到 stage 以及 prod 分支验证并发布

#### 非线上 prod 环境的 bugfix

stage 环境仅作为研发内部分段开发测试，所以不需要走 hotfix 流程，与其它 bug 一样按照普通 feature 开发流程开发提测即可
