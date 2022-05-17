//处理平台属性api接口

//引入封装号的请求接口
import request from '@/utils/request'

//一级分类请求
// /admin/product/getCategory1  get

export const reqAtterOne = () => request({
  url: '/admin/product/getCategory1',
  method: 'get'
})

//二级分类请求
// /admin/product/getCategory2{category1ld} get

export const reqAtterTwo = (category1ld) => request({
  url: `/admin/product/getCategory2/${category1ld}`,
  method: 'get'
})

//三级分类请求
// /admin/product/getCategory3{category2ld} get

export const reqAtterThree = (category2ld) => request({
  url: `/admin/product/getCategory3/${category2ld}`,
  method: 'get'
})

//获取平台属性请求
// /admin/product/attrInfoList/

export const reqgetAtterList = (oneid, twoid, terid) => request({
  url: `/admin/product/attrInfoList/${oneid}/${twoid}/${terid}`,
  method: 'get'
})

//添加属性与属性值接口
// /admin/product/saveAttrInfo

export const reqAddOrUpdateAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: 'post',
  data
})

//删除属性接口
// /admin/product/deleteAttr/{attrId}
export const reqDeletAttrId = (attrId)=> request({url:`/admin/product/deleteAttr/${attrId}`,method:"delete"})
