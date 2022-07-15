---
title: 敏捷实践 - 使用 semantic-release 自动管理发布版本
date: 2021-11-12
---

# 敏捷实践 - 使用 semantic-release 自动管理发布版本

### semantic-release 是什么

semantic-release 是一个全自动版本管理和包发布工具，提供诸如：

- 自动确定下个版本号
- 自动生成 release notes
- 自动生成 CHANGELOG.md 文件
- 自动发布

### 插件使用

@semantic-release/commit-analyzer: 负责解析 commit
@semantic-release/release-notes-generator : 生成 git-release 日志
@semantic-release/gitlab: 推送代码回到 gitlab
@semantic-release/changelog：修改 changelog 信息
@semantic-release/git：发布 release

### 使用注意

配置完 releaserc， gitlabCI 最后阶段加入 release 启动。

```
# gitlab.ci
stages:
  - release

release:
  stage: release
  image: ${CI_IMAGE_NODE}
  only:
    - stage
    - prod
  script:
    - npm install --quiet
    - npm run release
  tags:
    - docker
    - build
    - alish
```

@semantic-release/gitlab 插件需要配置 CI/CD Variables 以获得 访问权限，推荐使用单独的 gitlab-ci-bot 账号生成 personal access token 并配置成 Group CI/CD Variable
