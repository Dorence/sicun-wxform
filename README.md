# sicun-wxform

学习微信小程序：使用云函数和云存储实现问卷调查小程序。

## 1. Pages

页面跳转关系，与功能实现无关。详情[here](docs/pages.md).

```plain
path: miniprogram/pages

form/index 主页
├─── form/fillForm 填写问卷
├─── form/viewForm 浏览已填写的问卷
│    └─── form/fillForm 编辑未截止的问卷*
├─── design/newForm 新建问卷
└─── design/viewDesign 浏览已创建的问卷
     ├─── design/editDesign    编辑未发布的问卷
     ├─── design/publishDesign 修改问卷发布状态
     └─── stat/formStat        浏览统计结果
          └─── stat/personStat 浏览个人结果

user/index 用户主页
├─── help/index 简要的帮助页面
└─── user/option 设置用户名等
```

## 2. Color UI Quick Reference [here](docs/colorUI.md)

使用高对比度的 [ColorUI](https://www.color-ui.com/), 页面效果更活泼。

## 3. Sicunform

封装库，见 `miniprogram/sicunform`。

- Form Structure [here](docs/form-structure.md)
