//Sku组件相关Api接口

//引入封装好的request
import request from '@/utils/request'

//第一次获取数据接口 Spu列表数据
// /admin/product/{page}/{limit}

export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: {category3Id}
})


//根据Spu列表数据项的id 获取当前项的数据
// /admin/product/getSpuByld/{spukd}

export const reqSpuLists = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})


//获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList

export const reqTradeMarkList = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList ',
  method: 'get'
})

//获取Spu图标的接口
// /admin/product/spuImageList/{spuId}

export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

//获取平台全部销售属性  整个平台销售属性一共三个
// /admin/product/baseSaleAttrList

export const reqBaseSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'get'
})

//添加Spu or 修改 Spu 接口
// /admin/product/updateSpuInfo

export const reqAddSpuOrUpdeteSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: 'post',
      data: spuInfo
    })
  } else {
    return request({
      url: "/admin/product/saveSpuInfo",
      method: 'post',
      data: spuInfo
    })
  }
}

//删除Spu列表的一项
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpuItem = spuId => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})


//Spu下的Sku获取图片接口
// /admin/product/spuImageList/${spuId}

export const reqSpuSkuImageList = spuId => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

//获取销售属性接口
// /admin/product/spuSaleAttrList/${spuId}
export const reqSpuSaleAttrList = spuId => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})

//获取属性信息接口
// /admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

//保存信息接口
// /admin/product/saveSkuInfc
export const reqAddSaveSkuInfo = (skuInfo) => request({
  url: `/admin/product/saveSkuInfo`,
  method: 'post',
  data: skuInfo
})

//查看Sku列表数据接口
// /admin/product/findBySpuId/{spuId}

export const reqFindBySpuId = spuId => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})
