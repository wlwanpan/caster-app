import React, { Component } from 'react'
import { ScrollView, RefreshControl, Alert, DeviceEventEmitter } from 'react-native'
import { Spinner, List } from 'native-base'

import Placeholder from './Placeholder'
import MediaItem from './MediaItem'

import Store from '../../store'
import Controller from '../../controller'

export default class MediaList extends Component {

  constructor(props) {
    super(props)
    this.store = Store.getInstance()
    this.state = {
      refreshing: false,
      loading: false,
      currentMedia: this.store.getCurrentMedia()
    }
  }

  componentDidMount() {
    let { addr, port } = this.store.getSettings()
    if (addr && port) {
      this._fetchMedia()
    }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('current-media', this._onCurrentMediaChange.bind(this))
  }

  _fetchMedia() {
    this.setState({ loading: true })
    Controller.getMedia(this.props.mediaType)
    .then((resp) => {
      this.props.onChange(resp.data)
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error loading movies.")
    })
    .finally(() => {
      this.setState({ loading: false })
    })
  }

  _onCurrentMediaChange() {
    this.setState({
      ...this.state,
      currentMedia: this.store.getCurrentMedia()
    })
  }

  _onPlayMedia(id) {
    if (!this.store.isDeviceSelected()) {
      Alert.alert("No device selected. Please go to settings.")
    }
    Controller.playMedia(id)
    .then(() => {
      this.store.setCurrentMedia(id, 'playing')
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error casting media.")
    })
  }

  _onPauseMedia(id) {
    Controller.pauseMedia(id)
    .then(() => {
      this.store.setCurrentMedia(id, 'paused')
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error casting media.")
    })
  }

  _renderItem(item) {
    let { id, action } = this.state.currentMedia
    let stateType = item._id == id ? action : undefined
    return (
      <MediaItem
        onPlay={this._onPlayMedia.bind(this)}
        onPause={this._onPauseMedia.bind(this)}
        id={item._id}
        name={item.name}
        stateType={stateType}
        metadata={item.metadata} />
    )
  }

  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._fetchMedia.bind(this)} />
      }>
        {(() => {
          if (this.state.loading) {
            return (
              <Spinner color='blue' />
            )
          } else if (this.props.media == 0) {
            return (
              <Placeholder text="No media file available." />
            )
          } else {
            return (
              <List
                dataArray={this.props.media}
                renderRow={this._renderItem.bind(this)} />
            )
          }
        })()}
      </ScrollView>
    )
  }
}
