//将四个模块请求接口函数统一暴露
import * as trademark from './product/TradeMark'
import * as attrs from './product/Atter'
import * as sku from './product/Sku'
import * as spu from './product/Spu'

export default {
  trademark,
  attrs,
  sku,
  spu,
}
