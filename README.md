# easy-popup
#### 简单的弹窗插件
##### 让设计师随意设计，我只需要把它弹出来就行了~

---
##### 用法
1. 引用easy-popup.css 和 easy-popup.min.js(在jquery之后)。
2. var contents = '&#x3c;div class="easy-contents"&#x3e;弹窗内容&#x3c;/div&#x3e;'
3. 自定义easy-contents和easy-close的样式，宽高是必要的。
4. $.easypop({contents: contents})
5. 就是这么简单~

---
##### 参数
| key | value | description |
| ------------- | ------------- | ------------- |
| drag | true | 可拖拽 |
| closeBtn | true | 有关闭按钮 |
| clickOnOverlayer | true | 点击遮罩关闭弹窗 |
| contents | '&#x3c;div class="easy-contents"&#x3e;&#x3c;/div&#x3e;' | 弹窗内容 |
| afterClose | null | 回调函数 |

---
##### Demo
[点我点我](http://areyouse7en.github.io/easy-popup/)
