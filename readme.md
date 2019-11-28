# 🐱 Furazy - 轻巧的小动物图片收集库

A module for searching FURRY pictures.
[Find it in NPM](https://www.npmjs.com/package/furazy)

# Usage

### For Node.js

##### Install

```bash
$ npm install furazy --save
```

##### Import

```js
// es5
const Furazy = require("furazy")
// es6及以上
import Furazy from "furazy"
```

##### Usage

```js
const Furry = new Furazy()

/*
  Furazy 的所有请求均为异步操作，可用 .then() 或 await 获取结果
  All requests in Furazy are asynchronous, u can use .then() or await to get results.
*/
const searchIt = async () => {
  // 搜索同人图 / Search furry pictures
  let searchResult = await Furry.searchImage(
    "eevee", //关键词
    0, //类型，0为 e621 类型，1为 fa
    1, //页码
    1 //每页显示数目
  )
  console.log(searchResult)

  //搜索同人志 / Search doujins
  let mrm = await Furry.searchComic(
    "pokemon" //关键词
  )
  console.log(mrm)

  //查看同人志 / View doujins
  let comic = await Furry.getComic(
    "your_comic_url" //漫画地址
  )
  console.log(comic)
}

searchIt()
```

##### Result sample

```js
[
  {
    title:
      "2019 ambiguous_gender bodily_fluids digital_drawing_(artwork) digital_media_(artwork) dragon dragonite drooling duo eevee feral hiore hi_res imminent_vore larger_pred licking licking_lips macro mammal nintendo oral_vore pokémon pokémon_(species) saliva simple_background size_difference slightly_chubby soft_vore tongue tongue_out video_games vore white_background",
    preview:
      "https://static1.e621.net/data/preview/65/e2/65e289e2e05ed9a004d9e18fefda2962.jpg",
    image:
      "https://static1.e621.net/data/65/e2/65e289e2e05ed9a004d9e18fefda2962.png",
    author: "hiore",
    author_url:
      "https://www.pixiv.net/en/artworks/77983470, https://i.pximg.net/img-original/img/2019/11/25/03/37/25/77983470_p2.png, https://www.pixiv.net/member.php?id=45363288, https://twitter.com/D0Sd0ou3fm1R1rB/status/1196483299465519105"
  }
]
```

### For Python3

Coding...

# Find me

- Github [@Meeken1998](https://github.com/Meeken1998)
- 博客 [@meek3n.cn](https://meek3n.cn)

# License

MIT
