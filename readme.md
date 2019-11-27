### Furazy - 轻巧的小动物图片收集库
------------

作者：Meeken
[Github](https://github.com/Meeken1998)
[Blog](https://meek3n.cn)

**安装**
```bash
$ npm install furazy --save
```
**引入**
```js
// es5
const Furazy = require('furazy')
// es6及以上
import Furazy from 'furazy'
```
**使用**
```js
const Furry = new Furazy()

---

**二次开发**
```bash
$ git clone https://github.com/Meeken1998/furazy-spider/ furazy && cd furazy
$ npm install
```
测试
```bash
$ npm test
```

//Furazy 的所有请求均为异步操作，可用 .then() 或 await 获取结果
const searchIt = async () => {
	let result = Furry.search(
		'eevee', //关键词
		0, //类型，0为 e621 类型，1为 fa
		1, //页码
		1 //每页显示数目
	)
	console.log(result)
}

searchIt()
```

**搜索结果（示例）**
```js
[
  {
    title: '2019 ambiguous_gender bodily_fluids digital_drawing_(artwork) digital_media_(artwork) dragon dragonite drooling duo eevee feral hiore hi_res imminent_vore larger_pred licking licking_lips macro mammal nintendo oral_vore pokémon pokémon_(species) saliva simple_background size_difference slightly_chubby soft_vore tongue tongue_out video_games vore white_background',
    preview: 'https://static1.e621.net/data/preview/65/e2/65e289e2e05ed9a004d9e18fefda2962.jpg',
    image: 'https://static1.e621.net/data/65/e2/65e289e2e05ed9a004d9e18fefda2962.png',
    author: 'hiore',
    author_url: 'https://www.pixiv.net/en/artworks/77983470, https://i.pximg.net/img-original/img/2019/11/25/03/37/25/77983470_p2.png, https://www.pixiv.net/member.php?id=45363288, https://twitter.com/D0Sd0ou3fm1R1rB/status/1196483299465519105'
  }
]
```
可以很方便地将~~本子~~图片渲染在页面上～


**协议**
MIT
