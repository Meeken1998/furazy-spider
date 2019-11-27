const { searchOnFuraffinity, searchOnE621 } = require("./api/spider")

class Furazy {
  constructor() {}
  /**
   * @description 异步的图片搜索。
   * @param {String} name 搜索关键词，如 eevee。
   * @param {Int} type 目标网站类型，0: e621，1: FA。默认为 0。
   * @param {Int} page 页码，默认为 1。
   * @param {Int} limit 每页限制数量，默认为 24。（注意：FA 的 limit 只可为 24，48 或 72)
   * @return {Array} 包含图片地址，缩略图地址，作者，作者主页的数组。
   */
  async search(name = "", type = 0, page = 1, limit = 10) {
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

      default: {
        return []
      }
    }

    return res
  }
}

module.exports = Furazy
