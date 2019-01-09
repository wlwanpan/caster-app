import Store from './store'

export default class Controller {

  static getMedia(type) {
    let store = Store.getInstance()
    console.log(`Fetching media (${type}) from ${store.getBaseurl()}`)
    return fetch(`${store.getBaseurl()}/media?type=${type}`)
    .then((data) => {
      return data.json()
    })
  }

  static playMedia(id) {
    let store = Store.getInstance()
    console.log(`Casting media (${id})`)
    return fetch(`${store.getBaseurl()}/media/${id}/cast`, {
      method: 'POST',
      headers: store.getHeaders()
    })
    .then(() => {
      store.setCurrentMedia(id, 'playing')
    })
  }

  static pauseMedia() {
    let store = Store.getInstance()
    return fetch(`${store.getBaseurl()}/media/pause`, {
      method: 'POST',
      headers: store.getHeaders()
    })
  }

  static unpauseMedia() {
    let store = Store.getInstance()
    return fetch(`${store.getBaseurl()}/media/unpause`, {
      method: 'POST',
      headers: store.getHeaders()
    })
  }

}