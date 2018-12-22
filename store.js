import { AsyncStorage } from 'react-native'

const APP_SETTINGS = '@App:settings'

export default class Store {

  static instance = null

  settings = {
    addr: undefined,
    port: undefined,
    defaultDevice: {
      name: undefined,
      uuid: undefined
    }
  }

  static getInstance() {
    if (Store.instance == null) {
      Store.instance = new Store()
    }
    return Store.instance
  }

  loadSettings() {
    return AsyncStorage.getItem(APP_SETTINGS)
    .then((resp) => {
      let { addr, port, defaultDevice } = JSON.parse(resp)
      this.settings = {
        addr,
        port,
        defaultDevice
      }
      console.log(this.settings)
    })
  }

  saveSettings({ addr, port, defaultDevice }) {
    this.settings.addr = addr || this.settings.addr
    this.settings.addr = port || this.settings.port
    let { name, uuid } = defaultDevice
    if (name && uuid) {
      this.settings.defaultDevice = defaultDevice
    }
    let settingsAsStr = JSON.stringify(this.settings)
    return AsyncStorage.setItem(APP_SETTINGS, settingsAsStr)
  }

  isDeviceSelected() {
    let { name, uuid } = this.settings.defaultDevice
    return name && uuid
  }

  getSettings() {
    return this.settings
  }

  getBaseurl() {
    return `http://${this.settings.addr}:${this.settings.port}`
  }

  getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'device-uuid': this.settings.defaultDevice.uuid
    }
  }

}