# taro-cascader
基于 taro 的 级联 组件，可用于小程序、h5

## 🔨示例
<img src="./image/cascader.png" width="300" />

## ✨ 特性
- 支持异步加载数据

## 🍭 API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | array （必填） | [ ] |
| value | 选中值 | 多选情况下为数组 （必填） |  |
| onChange | 选中的回调 | function （必填） |  |
| loadData | 异步加载数据 | function，返回值需要为 promise 对象 |  |



#### dataSource

```js
  [{
    label: '水果',
    value: 'fruit',
    isLeaf: true,    // 设置为叶子节点(设置了loadData时有效)
    disabled: true,   // 是否禁用
    children: [],   // 子节点
  }]
```


[示例文件](https://github.com/Dolov/taro-cascader/blob/master/src/pages/index/index.tsx)