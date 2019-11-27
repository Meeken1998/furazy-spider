let axios = require("axios")
const cheerio = require("cheerio")

axios.defaults.withCredentials = true

const findInMyReadingManga = async options => {
  try {
    let url = `https://myreadingmanga.info/search${
      options.keywords ? "&" + options.keywords : ""
    }`
    let res = await axios.get(url, {
      params: {
        search: options.name,
        wpsolr_sort: options.sort, //sort_by_random: 随机，sort_by_relevancy_desc: 热度，sort_by_date_asc: 从旧到新，sort_by_date_desc: 从新到旧，
        wpsolr_page: options.page
      }
    })

    const $ = cheerio.load(res.data)
    let doubleCheck = [],
      arr = []
    $(".results-by-facets div").each((index, element) => {
      let title = $(element)
        .find("div:nth-child(1) > a:nth-child(1)")
        .text()
      let image, tags
      if (doubleCheck.indexOf(title) == -1 && title) {
        doubleCheck.push(title)
        source = $(element)
          .find("div:nth-child(1) > a:nth-child(1)")
          .attr("href")
        image = $(element)
          .find("div:nth-child(2) > img")
          .attr("src")

        tags = $(element)
          .find("div:nth-child(2)")
          .text()
          .replace(/\n/g, "")
        arr.push({
          title,
          source,
          image,
          tags
        })
      }
    })

    return arr
  } catch (err) {
    return []
  }
}

const getCommic = async commicUrl => {
  try {
    let url = commicUrl

    url = url.replace(/\/\d/, "")

    if (url.slice(-1) !== "/") {
      url = url + "/"
    }

    //找一找有没有下一页
    let res = await axios.get(url)
    const $ = cheerio.load(res.data)

    function normalGet() {
      let arr = []
      $("img.img-myreadingmanga").each((index, element) => {
        let img = $(element).attr("data-lazy-src")
        if (img) {
          arr.push(img)
        }
      })
      return arr
    }

    if ($(".entry-pagination")) {
      console.log("有下一页")
      let pageArr = [],
        imgArr = []

      $(".entry-pagination .post-page-numbers").each((index, element) => {
        let page = $(element).text()
        if (page > 0) {
          pageArr.push(page)
        }
      })

      if (pageArr.length > 0) {
        for (let i = 0; i < pageArr.length; i++) {
          let r = (await getCommitPrivate(url + pageArr[i])) || []
          imgArr = imgArr.concat(r)
        }

        return imgArr
      } else {
        return normalGet()
      }
    } else {
      //没有下一页，直接整活
      return normalGet()
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

const getCommitPrivate = async url => {
  try {
    let res = await axios.get(url)
    const $ = cheerio.load(res.data)
    let arr = []
    $("img.img-myreadingmanga").each((index, element) => {
      let img = $(element).attr("data-lazy-src")
      if (img) {
        arr.push(img)
      }
    })
    return arr
  } catch (err) {
    return []
  }
}

module.exports = { findInMyReadingManga, getCommic }
