const axios = require("axios")

const canIUse = async options => {
  /*
    e621, e926, booru, myreadingmanga, furaffinity
  */
  let arr = options
  let res = {},
    tmp
  if (arr.indexOf("e621") > -1) {
    console.log("\x1B[36m%s\x1B[0m", "正在检测 e621.net...")

    try {
      tmp = await axios.get("https://e621.net")
      res.e621 = tmp.status
    } catch (err) {
      console.log("\x1b[91m", "[连接超时]")
      res.e621 = 500
    }
  }
  if (arr.indexOf("e926") > -1) {
    console.log("\x1B[36m%s\x1B[0m", "正在检测 e926.net...")

    try {
      tmp = await axios.get("https://e926.net")
      res.e926 = tmp.status
    } catch (err) {
      console.log("\x1b[91m", "[连接超时]")
      res.e926 = 500
    }
  }
  if (arr.indexOf("booru") > -1) {
    console.log("\x1B[36m%s\x1B[0m", "正在检测 furry.booru.org...")

    try {
      tmp = await axios.get("https://furry.booru.org/index.php")
      res.booru = tmp.status
    } catch (err) {
      console.log("\x1B[36m%s\x1B[0m", "\x1b[91m", "[连接超时]")

      res.booru = 500
    }
  }
  if (arr.indexOf("myreadingmanga") > -1) {
    console.log("\x1B[36m%s\x1B[0m", "正在检测 myreadingmanga.info...")
    try {
      tmp = await axios.get("https://myreadingmanga.info")
      res.myreadingmanga = tmp.status
    } catch (err) {
      console.log(err)
      console.log("\x1b[91m", "[连接超时]")
      res.myreadingmanga = 500
    }
  }
  if (arr.indexOf("furaffinity") > -1) {
    console.log("\x1B[36m%s\x1B[0m", "正在检测 furaffinity.net...")
    try {
      tmp = await axios.get("https://furaffinity.net")
      res.furaffinity = tmp.status
    } catch (err) {
      console.log("\x1b[91m", "[连接超时]")
      res.furaffinity = 500
    }
  }

  return res
}

module.exports = { canIUse }
