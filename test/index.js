const Furazy = require("../index")

const furry = new Furazy()
const testThis = async () => {
  let res = await furry.search("eevee", 1, 1, 24)
  console.log(res)
}

testThis()
