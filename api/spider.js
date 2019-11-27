const axios = require("axios")
const cheerio = require("cheerio")

const formatItem = obj => {
  return {
    title: obj["title"] || "",
    preview: obj["preview"] || "",
    image: obj["image"] || "",
    author: obj["author"] || "",
    author_url: obj["author_url"] || ""
  }
}

const searchOnE621 = async options => {
  let res = await axios.get("https://e621.net/post", {
    params: {
      tags: options.name,
      page: options.page,
      limit: options.limit
    }
  })
  const data = res.data

  let info = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]["file_url"]) {
      let obj = {}
      obj["title"] = data[i]["tags"] || ""
      obj["preview"] = data[i]["preview_url"] || ""
      obj["image"] = data[i]["file_url"] || ""
      obj["author"] =
        data[i]["artist"] instanceof Array ? data[i]["artist"].join(", ") : ""
      obj["author_url"] =
        data[i]["sources"] instanceof Array ? data[i]["sources"].join(", ") : ""
      info.push(formatItem(obj))
    }
  }

  console.log(info)

  return info
}

const searchOnE926 = async options => {
  let res = await axios.get("https://e926.net/post", {
    params: {
      tags: options.name,
      page: options.page,
      limit: options.limit
    }
  })
  const data = res.data

  let info = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]["file_url"]) {
      let obj = {}
      obj["title"] = data[i]["tags"] || ""
      obj["preview"] = data[i]["preview_url"] || ""
      obj["image"] = data[i]["file_url"] || ""
      obj["author"] =
        data[i]["artist"] instanceof Array ? data[i]["artist"].join(", ") : ""
      obj["author_url"] =
        data[i]["sources"] instanceof Array ? data[i]["sources"].join(", ") : ""
      info.push(formatItem(obj))
    }
  }

  console.log(info)

  return info
}

const searchOnFuraffinity = async options => {
  let res = await axios.get("https://www.furaffinity.net/search/", {
    params: {
      q: options.name,
      page: options.page + "",
      perpage: options.limit + "", // 24, 48, 72
      "order-by": "relevancy",
      "order-direction": "desc",
      range: "all",
      "rating-general": "on",
      "type-art": "on",
      "type-flash": "on",
      "type-photo": "on",
      "type-music": "on",
      "type-story": "on",
      "type-poetry": "on",
      mode: "extended",
      next_page: `>>>+${options.limit}+more+>>>`
    }
  })
  const $ = cheerio.load(res.data)
  let imgList = []
  $("figure").each((index, element) => {
    const preview = $(element)
      .find("img")
      .attr("src")
      .replace("//", "https://")
    let item = {
      preview,
      image: preview
        .replace("@100-", "@1600-")
        .replace("@200-", "@1600-")
        .replace("@300-", "@1600-")
        .replace("@400-", "@1600-")
        .replace("@500-", "@1600-")
        .replace("@600-", "@1600-")
    }

    item["url"] =
      "https://www.furaffinity.net/" +
        $(element)
          .find("u a")
          .attr("href") || ""

    $(element)
      .find("p a")
      .each((idx, ele) => {
        if (idx == 0) {
          item["title"] = $(ele).attr("title")
        }
        if (idx == 1) {
          item["author"] = $(ele).attr("title")
          item["author_url"] = `https://www.furaffinity.net/user/${$(ele).attr(
            "title"
          )}/`
        }
      })
    imgList.push(formatItem(item))
  })
  return imgList
}

module.exports = {
  searchOnE621,
  searchOnFuraffinity,
  searchOnE926
}
