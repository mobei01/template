# vue-cli-template

> 本模版是基于 `vue-cli@^4.x`, 配置的 `vue@2.x` 的模版配置, 配置已支持 `vue/essential` 和 `vue/prettier` 格式化 和 基于 `stylelint` 格式化样式文件.

## 项目启动

```shell
npm i && npm run serve
```

> 项目已支持热更新

## 项目打包

```shell
npm run build
```

## 项目格式化

```shell
npm run lint && npm run lint:css
```

## 提交格式化

> 项目在 `vue-cli` 的基础上, 增加了 `husky` 与 `commitlint` 验证提交信息, 提交规范采用的是 `angular` 的提交规范.现在提交方式可以分为两种
>
> 1. 利用 `git` 命令提交, `git commit -m 'feat: 新增功能'`.
> 2. 我们有增加 `commitizen` 插件, 用于 `git cz` 命令代替 `git commit`, 这样会自动提供主题选择.

```js
// NOTE: 提交规范

build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
merge：分支合并 Merge branch ? of ?
fix：bug 修复
perf：性能, 体验优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型
```

```shell
⚠️: 对于`husky` 与 `lint-staged` 如果出现配置问题, 请安装最新版
yarn add husky@next
yarn add -D lint-staged@beta
```

## 自定义配置

> 请参考 `vue-cli` [配置文件](https://cli.vuejs.org/config/).
