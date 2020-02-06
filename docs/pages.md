# Pages

## Outline

共分为12个页面, 主页的tabBar包括两个页面Tab: `form/index` 和 `user/index`.

每个人请标注一下自己负责的页面并完善相应的文档.

如果需要注册组件的添加在合理目录中即可.

\# | Page | &emsp; | &nbsp;
-- | ------------------------------------- | - | -
1  | [form/index](#1.%20;form/index)       | 问卷主页 | 吴竹君
2  | [form/fillForm](#2.%20;form/fillForm) | 填写问卷/编辑未截止的问卷 | 薛海波
3  | [form/viewForm](#3.%20;form/viewForm) | 浏览已填写的问卷 | 薛海波, 昝学健
4  | design/newForm                        | 新建问卷/编辑问卷基本信息 | 昝学健
5  | design/viewDesign                     | 浏览已创建的问卷 | 薛海波, 昝学健
6  | design/editDesign                     | 编辑未发布的问卷 | 昝学健
7  | design/publishDesign                  | 预览问卷 | 暂不实现
8  | stat/formStat                         | 浏览统计结果 | 谭滨瀚
9  | stat/personStat                       | 浏览个人结果 | 谭滨瀚
10 | user/index                            | 用户主页 | 吴竹君
11 | user/option                           | 设置用户名等用户信息 | 吴竹君
12 | help/index                            | 简要的帮助页面 | 暂不实现
-  | - |数据库, 云函数设计 | 李诺(和相应页面合作)

## 1. form/index

问卷主页

- 检查登录状态，未登录提示进入用户页面 `user/index` 登录
- 主页进入时跳转/扫码进入问卷填写 `form/fillForm`
- 进入 `form/viewForm`
- 如果是授权用户，可进入 `design/newForm`
- 如果是授权用户，可进入 `design/viewDesign`

## 2. form/fillForm

填写问卷/编辑未截止的问卷

- 需要传入问卷id, 否则返回上页
- 获取该用户对应问卷记录, 若已存信息则需填入
- 可以暂存(保存部分填写结果)
- 提交时锁定结果(可以考虑建表存用户填写状态)

## 3. form/viewForm

浏览已填写的问卷

- 根据用户 `openid` (已登录), 获取所有其参与填写的问卷的列表
- 可跳转查看对应问卷: 可填写的进入修改 `form/fillForm`, 不可填写的仅浏览（考虑是否新增页面）

## 4. design/newForm

新建问卷/编辑问卷基本信息

- 新建: 可填写 `FormInfoType` 中的信息, 状态为 `Editing`.
- 编辑: 编辑 `FormInfoType` 中的信息, 可设置状态.
- 完成后插入数据库, 跳转至编辑问卷页面 `design/editDesign`

## 5. design/viewDesign

浏览已创建的问卷

- 根据用户 `openid` (已登录且有权限), 获取创建的所有问卷的列表
- 可跳转查看对应问卷:
  - 可编辑基本信息 `design/newForm`
  - 可编辑问卷内容 `design/editDesign`
  - 预览页面 `design/publishDesign`

## 6. design/editDesign

编辑未发布的问卷

## 7. design/publishDesign

预览问卷

## 8. stat/formStat

浏览统计结果

## 9. stat/personStat

浏览个人结果

## 10. user/index

用户主页

## 11. user/option

设置用户名等用户信息

## 12. help/index

简要的帮助页面
