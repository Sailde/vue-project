//引入request
import request from '@/utils/request'

//获取Spu列表数据的接口
// /admin/product/{page}/{limit}

export const reqSpuList = (page, limit,category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: {category3Id}
})
