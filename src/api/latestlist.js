import fetch from '@/utils/request'

export const listApi = {
  // 查询 达人榜下除综合外的领域 因为榜单数量不多 所以一次性返回
  getAreas (params = {secret: '', status: ''}) {
    return fetch({
      url: '/api/latestlist/areas',
      method: 'get',
      params
    })
  },

  // 查询 翻页查询达人榜排名
  getDaren (params = { lastMaxId: '', secret: '', size: '', version: '' }) {
    return fetch({
      url: '/api/latestlist/daren',
      method: 'get',
      params
    })
  },

  // 获取主榜单 分类榜单 更多榜单下的所有榜单
  getBydir (params = {}) {
    return fetch({
      url: '/api/list/allBydir',
      method: 'get',
      params
    })
  },

  // 获取所有目录信息
  getDirs (params = {}) {
    return fetch({
      url: '/api/list/alldirs',
      method: 'get'
    })
  },

  // 获取榜单指定期限内容的数量
  getPageCount (params = {count: 10, id: 212}) {
    return fetch({
      url: '/api/list/pageCount',
      method: 'get',
      params
    })
  },

  // 获取榜单指定期限的内容
  getPageQuery (params) {
    params = { page: 1, pageSize: 10, ...params }
    return fetch({
      url: '/api/list/pageQuery',
      method: 'get',
      params
    })
  },

  // 获取指定榜单已发布历史的详细信息
  getPublishdetail (params = {id: 83}) {
    return fetch({
      url: '/api/list/publishdetail',
      method: 'get',
      params
    })
  },

  // 获取顶级目录
  getTopdirs (params = {}) {
    return fetch({
      url: '/api/list/topdirs',
      method: 'get'
    })
  },

  // 批量获取达人的信息
  getListdareninfo (params = {darens: []}) {
    return fetch({
      url: '/api/daren/listdareninfo',
      method: 'get',
      params
    })
  },

  // 批量获取机构的信息
  getListOrginfo (params = { organizations: [] }) {
    return fetch({
      url: '/api/daren/listorganization',
      method: 'get',
      params
    })
  }

}
