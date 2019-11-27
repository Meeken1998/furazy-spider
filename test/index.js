const Furazy = require("../index")
// const { getCommic } = require("../api/commic")
const furry = new Furazy()
const testThis = async () => {
  // let res = await furry.search("eevee", 2, 1, 24)
  // console.log(res)
  let res = await furry.searchCommic("eevee")
  console.log(res)
}

testThis()
