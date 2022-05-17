//引入request
import request from '@/utils/request'

// 根据当前第几页获取相应数据接口
// /admin/product/list/{page}/{limit}

export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})

//上架接口  Or //下架接口
// /admin/product/cancelSale/${}    // /admin/product/onSale/${}

export const reqPutOrDown = ({isSale, skuId}) => {
  if (isSale === 0) {
    return request({
      url: `/admin/product/onSale/${skuId}`,
      method: 'get'
    })
  } else {
    return request({
      url: `/admin/product/cancelSale/${skuId}`,
      method: 'get'
    })
  }
}

//获取Sku详情接口
// /admin/product/getSkuById/${skuId}

export const reqSkuById = skuId => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})
