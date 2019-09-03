/*
 * @Author: liuxia
 * @Date: 2019-08-15 10:17:24
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-08-31 20:28:20
 */

import { listApi } from '~/api/latestlist.js'

const obj = {
  state: {
    allDirs: JSON.parse(window.sessionStorage.getItem('alldirs')) || {}
  },
  getters: {
    allDirs: state => state.allDirs
  },
  mutations: {
    SET_ALLDIRS: (state, dirs) => {
      state.dirs = dirs
    }
  },
  actions: {
    GetBydir ({ commit }) {
      return new Promise((resolve, reject) => {
        listApi.getBydir().then(response => {
          const data = response.data.data
          const obj = {}
          data.forEach(item => {
            if (!obj[item['oneName']]) {
              obj[item['oneName']] = {
              // descContent: item.descContent,
                label: item['oneName'],
                oneId: item.one,
                twoIdArr: [item.two],
                threeIdArr: [item.id],
                children: [{
                  id: item.id,
                  cover: item.cover,
                  name: item.name || '',
                  date: item.latestPublishTime || '',
                  twoName: item.twoName,
                  twoId: item.two,
                  children: [{
                    descContent: item.descContent,
                    threeName: item.name,
                    threeId: item.id
                  }]
                }]
              }
            } else if (!obj[item['oneName']].twoIdArr.includes(item.two)) {
              obj[item['oneName']].twoIdArr.push(item.two)
              obj[item['oneName']].children.push({
                cover: item.cover,
                id: item.id,
                name: item.name || '',
                date: item.latestPublishTime || '',
                twoName: item.twoName,
                twoId: item.two,
                children: [{
                  descContent: item.descContent,
                  threeName: item.name,
                  threeId: item.id
                }]
              })
            } else if (!obj[item['oneName']].threeIdArr.includes(item.id)) {
              obj[item['oneName']].twoIdArr.push(item.id)
              obj[item['oneName']].children.forEach(k => {
                if (k.twoId === item.two) {
                  k.children.push({
                    descContent: item.descContent,
                    threeName: item.name,
                    threeId: item.id
                  })
                }
              })
            }
          })
          window.sessionStorage.setItem('alldirs', JSON.stringify(obj))
          commit('SET_ALLDIRS', obj)
          resolve(obj)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default obj
