const path = require("path")
const axios = require("axios")
const fs = require("fs")

async function downloadFile(url, filepath, name) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath)
  }
  const mypath = path.resolve(filepath, name)
  const writer = fs.createWriteStream(mypath)
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  })
  response.data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

module.exports = { downloadFile }
