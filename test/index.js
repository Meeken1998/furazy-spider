const Furazy = require("../index")
// const { getComic } = require("../api/comic")
const Furry = new Furazy()
/*
  Furazy 的所有请求均为异步操作，可用 .then() 或 await 获取结果
  All requests in Furazy are asynchronous, u can use .then() or await to get results.
*/
const searchIt = async () => {
  // Search furry pictures
  let searchResult = await Furry.searchImage(
    "eevee",   //[String]name (search keywords)
    1,         //[Int]type, 0: e621.net，1: fa, 2: e926.net
    1,         //[Int]page
    1          //[Int]limit
  )
  console.log(searchResult)

  // Search doujins
  let mrm = await Furry.searchComic(
    "pokemon", //[String]name (search keywords)
    0, //[Int]sort
    1 //[Int]page
  )
  console.log(mrm)

  // View doujins (only for myreadingmanga.info now)
  let comic = await Furry.getComic(
    "https://myreadingmanga.info/koto-sato-yamashii-koino-hajimekata-kr/" //[String]commicUrl
  )
  console.log(comic)
}

const canIUse = async () => {
  let checkResult = await Furry.canIUse([
    "e621",
    "e926",
    "myreadingmanga",
    "furaffinity",
    "booru"
  ])
  console.log(checkResult)
}


canIUse()
// searchIt()
