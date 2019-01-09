import Store from './store'

export default class Controller {

  static baseUrl() {
    return Store.getInstance().baseUrl()
  }

  static headers() {
    return Store.getInstance().getHeaders()
  }

  // Media static methods
  static getMedia(mediaType) {
    console.log(`Fetching media (${mediaType}) from ${this.baseUrl()}`)
    return fetch(`${this.baseUrl()}/media?type=${mediaType}`)
      .then((data) => {
        return data.json()
      })
  }

  static searchMedia(mediaType, searchVal) {
    console.log(`Searching media (${mediaType}): ${searchVal}`)
    return fetch(`${this.baseUrl()}/media?type=${mediaType}&search=${search}`)
      .then((data) => {
        return data.json()
      })
  }

  static playMedia(id) {
    console.log(`Casting media (${id})`)
    return fetch(`${this.baseUrl()}/media/${id}/cast`, {
        method: 'POST',
        headers: this.headers()
      })
      .then(() => {
        store.setCurrentMedia(id, 'playing')
      })
  }

  static pauseMedia() {
    return fetch(`${this.baseUrl()}/media/pause`, {
        method: 'POST',
        headers: this.headers()
      })
  }

  static unpauseMedia() {
    return fetch(`${this.baseUrl()}/media/unpause`, {
        method: 'POST',
        headers: this.headers()
      })
  }

  // Device static methods
  static getDevices() {
    console.log('Fetching devices')
    return fetch(`${this.baseUrl()}/devices`)
      .then((data) => {
        return data.json()
      })
  }

}