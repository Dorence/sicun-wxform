# Form Structure

`Sicunform.Form`
  
一份问卷就是一个表单(`form`).

## 1. Outline

```typescript
type Form = {
    "_id": string;
    "id": number;
    "info": FormInfo;
    "type": enum;
    "data": Section[] {
        "id": number;
        "info": SectionInfo;
        "type": enum;
        "data": Question[] {
            "id": number;
            "info": QuestionInfo;
            "type": enum;
            "data": Answer[];
        };
    };
};
```

## 2. FormType

Prototypes

`Sicunform.Form.FormType`

 Fields | Type            | Notes
-------:| --------------- | -----------------
 `id`   | `Number`        | id, or index
 `data` | `Array`         | data of children
 `info` | `FormInfoType`  | information
 `type` | `Enum`          |

### FormInfoType

`Sicunform.Form.FormInfoType`

 Fields     | Type     | Description
-----------:| -------- | ----------------------------------
 `comments` | `String` | 注释说明, 发布后不可见
 `no`       | `String` | 条目编号, 如: `1`, `A`, `一`, `甲`
 `state`    | `Enum`   | 状态, 用于标识和分类
 `title`    | `String` |

## 3. Form

`Sicunform.Form.Form [[FormType]]`

 Fields | Type        | Notes
-------:| ----------- | -----------------
 `_id`  | `String`    | 数据库id, unique
 `id`   | `Number`    | unused
 `data` | `Section[]` | 各个Section
 `info` | `FormInfo`  | 表单信息
 `type` | `Enum`      | unused

### FormInfo

`Sicunform.Form.FormInfo [[FormInfoType]]`

 Fields    | Type | Editable | Description
----------:| -------- |:-:| ----------------
comments   | `String` | Y |
createTime | `Date`   |   | 创建时间
lastEdit   | `Date`   |   | 最后一次编辑时间
no         | `String` | Y |
ownerid    | `String` |   | 创建人openid
owner      | `String` |   | 创建人姓名
state      | `Enum`   | Y | 问卷状态
title      | `String` | Y | 表单名

#### `FormInfo.state` : Enum

Value | Definition | Notes
-----:| ------- | -------------------------
 `0`  | Editing | 设计表单
 `1`  | Preview | 预览表单，发布但不可填表
 `2`  | Publish | 公开可填表
 `3`  | Archive | 已结束，不可填表，不再编辑

## 4. Section

`Sicunform.Form.Section [[FormType]]`

 Fields | Type          | Notes
-------:| ------------- | --------------------------
 `id`   | `Number`      | Section在Form.data中的下标
 `data` | `Question[]`  | 各个问题
 `info` | `SectionInfo` | Section信息
 `type` | `Enum`        | Section的类型

### SectionInfo

`Sicunform.Form.SectionInfo [[FormInfoType]]`

 Key       | Type       | Description
----------:| ---------- | ----------------------
comments   | `String`   |
imagePath? | `String[]` | 图片的云存储路径, 多图
no         | `String`   | 编号
state      | `Number`   | unused
text?      | `String`   | 文本描述
title      | `String`   |

#### `SectionInfo.text` : String

`text`字符串中的`{{i}}`表示`imagePath`中的下标为`i`的图

### `Section.type` : Enum

 Value | Definition | Notes
------:| ---------- | ------------------------------
 `0`   | Text       | 纯文本，无问题
 `1`   | Normal     | 仅含若干个问题
 `2`   | Artical    | 标题，文本/图片描述，若干个问题
 `3`   | Custom     | 自定义内容，暂不实现

## 5. Question

`Sicunform.Form.Question [[FormType]]`

 Fields | Type           | Notes
-------:| -------------- | ----------------------
 `id`   | `Number`       | Section.data中的下标
 `data` | `Answer[]`     | 各个选项
 `info` | `QuestionInfo` | 问题信息
 `type` | `Enum`         | 问题类型

### QuestionInfo

`Sicunform.Form.QuestionInfo [[FormInfoType]]`

 Fields  | Type      | Notes
--------:| --------- | ----------------------
choose   | `any`     | 选项选中信息
comments | `String`  |
depend   | `Array`   | 该题依赖的题目列表
no       | `String`  | 题号(全Form中)
state    | `Number`  | 题目回答状态
text     | `String`  | 题目一般文本描述
title    | `String`  | 主要文字描述
visible  | `Boolean` | 发布后本题是否可见

#### `QuestionInfo.depend` : Array

对于不同的值, 其含义如下,

 Element                 | Description
------------------------:| ----------------------
`n: NuNmber`             | 第`n`题完成
`[q: Number, a: Number]` | 第`q`题选中第`a`个选项

例如 `depend = [5, [6, 0] ]` 表示:
当完成第5题且第6题选中第0项时本题才可选择，否则折叠本题且不可选。

#### `QuestionInfo.state` : Number

Value | Definition | Notes
-----:| ---------- | ----------------
 `0`  | Default    | 默认状态，填写前
 `1`  | Done       | 已填写，尚未验证
 `2`  | Success    | 填写正确
 `3`  | Warning    | 内容有风险
 `4`  | Empty      | 必填项未填
 `5`  | Invalid    | 内容不合法

### `Question.type` : Enum

Value         | Definition | Notes
-------------:| ---------- | ---------------------
Input         | 文本输入框 | 默认
Checkbox      | 多选题 | 提供多个选项
MultiSelector | 多列滚动选择器 | 参考小程序原生实现
Picker        | 滚动选择器 | 提供多个选项
Ratio         | 单选题 | 提供多个选项
Slider        | 滑动选择 | 提供范围、粒度等
Switch        | 开关选择 |
Textarea      | 多行文本输入 |
 ...          | ... | 参考前期任务

期望添加的元素可以写在Projects板块中. 属性添加在`QuestionInfo`中.

## 6. Answer

`Sicunform.Form.Answer [[FormInfoType]]`

 Fields   | Type       | Notes
---------:| ---------- | ------------------------
id        | `Number`   | Question.answers中的下标
comments  | `String`   |
imagePath | `String[]` | 图片的云存储路径, 多图
no        | `String`   | 选项序号
state     | `Number`   | 选项回答状态，待补充
title     | `String`   | unused
text      | `String`   | 文本描述
