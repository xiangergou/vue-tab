/*
 * @Author: liuxia
 * @Date: 2019-08-15 10:17:24
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-08-22 11:00:50
 */

import { homeApi } from '~/api/home.js'
import { listApi } from '~/api/latestlist.js'

const obj = {
  state: {
    // 爆文数据
    pageQuerylist: JSON.parse(window.sessionStorage.getItem('pageQuerylist')) || [],
    listlinks: JSON.parse(window.sessionStorage.getItem('listlinks')) || [],
    adv: JSON.parse(window.sessionStorage.getItem('ListMainAdv')) || [],
    ranklists: JSON.parse(window.sessionStorage.getItem('ranklists')) || [],
    hostObj: JSON.parse(window.sessionStorage.getItem('hostObj')) || [],
    videoObj: JSON.parse(window.sessionStorage.getItem('videoObj')) || [],
    banners: JSON.parse(window.sessionStorage.getItem('banners')) || []
  },
  mutations: {
    SET_PAGE_QUERY: (state, data) => {
      state.pageQuerylist = data
    },
    SET_LIST_LINK: (state, data) => {
      state.listlinks = data
    },
    SET_MAIN_ADV: (state, data) => {
      state.adv = data
    },
    SET_RANK_LIST: (state, data) => {
      state.ranklists = data
    },
    SET_HOST_DATA: (state, data) => {
      state.hostObj = data
    },
    SET_VIDEO_DATA: (state, data) => {
      state.videoObj = data
    },
    SET_BANNERS: (state, data) => {
      state.banners = data
    }
  },
  actions: {
    // 爆文数据
    getPageQuery ({ commit }) {
      return new Promise((resolve, reject) => {
        homeApi.getPageQuery().then(response => {
          const data = response.data.data
          console.log(data, 'getPageQuery')
          window.sessionStorage.setItem('pageQuerylist', JSON.stringify(data))
          commit('SET_PAGE_QUERY', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getListlinks ({ commit }) {
      return new Promise((resolve, reject) => {
        homeApi.getListlinks().then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('listlinks', JSON.stringify(data))
          commit('SET_LIST_LINK', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getListMainAdv ({ commit }) {
      return new Promise((resolve, reject) => {
        homeApi.getListMainAdv().then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('ListMainAdv', JSON.stringify(data))
          commit('SET_MAIN_ADV', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRanklists ({ commit }) {
      return new Promise((resolve, reject) => {
        homeApi.getRanklists().then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('ranklists', JSON.stringify(data))
          commit('SET_RANK_LIST', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getHostData ({ commit }, param) {
      return new Promise((resolve, reject) => {
        listApi.getPageQuery(param).then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('hostObj', JSON.stringify(data))
          commit('SET_HOST_DATA', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVideoData ({ commit }, param) {
      return new Promise((resolve, reject) => {
        listApi.getPageQuery(param).then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('videoObj', JSON.stringify(data))
          commit('SET_VIDEO_DATA', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getBanners ({ commit }) {
      return new Promise((resolve, reject) => {
        homeApi.getBanners().then(response => {
          const data = response.data.data
          window.sessionStorage.setItem('banners', JSON.stringify(data))
          commit('SET_BANNERS', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default obj
