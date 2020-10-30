# vuecli_element_temp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 配置 Form 表单验证：
> 1、必须给 el-from 组件绑定 model 为表单数据对象
  2、给需要验证的表单项 el-form-item 绑定 prop 属性
     注意：prop 属性需要指定表单对象中的数据名称
  3、通过 el-from 组件的 rules 属性配置验证规则
    具体的验证规则可以参考：https://github.com/yiminghe/async-validator
    如果内置的验证规则不满足，也可以自定义验证规则
  手动触发表单验证：
  1、给 el-form 设置 ref 起个名字（随便起名，不要重复即可）
  2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证

### 自定义验证规则
>  自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
   验证通过：callback()
   验证失败：callback(new Error('错误消息'))
   validator 验证函数不是你来调用的，而是当 element 表单触发验证的时候它会自己内部调用
   所以你只需要提供校验函数处理逻辑就可以了
    通过：callback()

### 在组件内起名字的好处
> 指定 name 选项的另一个好处是便于调试。
  有名字的组件有更友好的警告信息。
  另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
