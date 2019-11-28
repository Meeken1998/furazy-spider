const {
  searchOnFuraffinity,
  searchOnE621,
  searchOnE926
} = require("./api/spider")

const { findInMyReadingManga, getComic } = require("./api/comic")

class Furazy {
  constructor() {}
  /**
   * @description 异步的图片搜索。
   * @param {String} name 搜索关键词，多个请用空格区分。如 eevee。
   * @param {Int} type 目标网站类型，0: e621，1: FA，2: e926。默认为 0。
   * @param {Int} page 页码，默认为 1。
   * @param {Int} limit 每页限制数量，默认为 24。（注意：FA 的 limit 只可为 24，48 或 72)
   * @return {Array} 包含图片地址，缩略图地址，作者，作者主页的数组，[ {title, preview, image, author, author_url } ]。
   */
  async searchImage(name = "", type = 0, page = 1, limit = 10) {
    const options = {
      name,
      type,
      page,
      limit
    }

    let res = []

    switch (type) {
      case 0: {
        res = await searchOnE621(options)
        break
      }

      case 1: {
        res = await searchOnFuraffinity(options)
        break
      }

      case 2: {
        res = await searchOnE926(options)
        break
      }

      default: {
        return []
      }
    }

    return res
  }

  /**
   * @description 从 MyReadingManga 搜索漫画，不支持设置每页显示数量。
   * @param {String} name 搜索关键词，多个请用空格区分。如 shota。
   * @param {Int} sort 0: 热度，1: 随机，2: 从旧到新，3: 从新到旧。
   * @param {Int} page 页码，默认为 1。
   * @param {String} keywords 自定义搜索参数，勿添加 "&"，如 wpsolr_fq[0]=genre_str:Furry。
   * @return {Array} 包含同人志信息的数组，[ { title, source, image, tags } ]。
   */
  async searchComic(name = "", sort = 0, page = 1, keywords = "") {
    const sortOptions = [
      "sort_by_random",
      "sort_by_relevancy_desc",
      "sort_by_date_asc",
      "sort_by_date_desc"
    ]

    const options = {
      name,
      sort: sortOptions[sort],
      page,
      keywords
    }

    let res = await findInMyReadingManga(options)
    return res
  }

  /**
   * @description 获取 MyReadingManga 的某一本漫画。
   * @param {String} comicUrl 漫画地址。
   * @return {Array} 同人志漫画图片地址的数组，[ { url1, url2, ... } ]。
   */
  async getComic(comicUrl = "") {
    let res = await getComic(comicUrl)
    return res
  }
}

module.exports = Furazy
