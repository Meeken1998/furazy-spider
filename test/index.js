const Furazy = require("../index")
// const { getComic } = require("../api/comic")
const furry = new Furazy()
const testThis = async () => {
  // let res = await furry.search("eevee", 2, 1, 24)
  // console.log(res)
  let res = await furry.searchComic("eevee")
  console.log(res)
}

testThis()
