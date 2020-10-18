import gbl from "./global"
import { Canvas } from "./interface"
// 下载图片方法
export const downloadImgUrl = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    gbl.downloadFile({
      url,
      success: (res) => resolve(res.tempFilePath),
      fail: reject
    })
  })

// 获取node节点
export const getCanvas2dContext = (selector: string, componentThis?: any): Promise<Canvas | {}> => {
  return new Promise(resolve => {
    const query = (
      componentThis ?
        gbl.createSelectorQuery().in(componentThis) :
        gbl.createSelectorQuery()
    ) as WechatMiniprogram.SelectorQuery;
    query.select(selector)
      .fields({ node: true }, res => {
        const node = res?.node as Canvas | undefined
        if (!node) {
          console.warn("注意! 当前绘制模式并非2d绘制, 直接设置canvas.width|canvas.height将没有任何效果!")
        }
        resolve(node || {})
      }).exec()
  })
}