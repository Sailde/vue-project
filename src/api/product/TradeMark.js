//这个模块主要获取品牌管理相关数据模块
// /admin/product/baseTrademark/{page}/{limit}
import request from '@/utils/request'

export const reqTradeMark = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

//处理新增品牌的操作
// /admin/product/baseTrademark/save

// 处理修改品牌的操作
// /admin/product/baseTrademark/update

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark})
  } else {
    return request({url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark})
  }
}

// 处理品牌删除业务操作
// /admin/product/baseTrademark/remove/{id}

export const delTrademark = (id) => request({url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'})
