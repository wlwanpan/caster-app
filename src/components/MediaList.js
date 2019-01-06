import React, { Component } from 'react'
import { ScrollView, RefreshControl, Alert } from 'react-native'
import { Spinner, List } from 'native-base'

import Placeholder from './Placeholder'
import MediaItem from './MediaItem'

import Store from '../../store'

export default class MediaList extends Component {

  constructor(props) {
    super(props)
    this.store = Store.getInstance()
    this.state = {
      refreshing: false,
      loading: false
    }
  }

  componentDidMount() {
    let { addr, port } = this.store.getSettings()
    if (addr && port) {
      this._fetchMedia()
    }
  }

  _getMediaUrl() {
    let baseUrl = this.store.getBaseurl()
    return `${baseUrl}/media?type=${this.props.mediaType}`
  }

  _fetchMedia() {
    console.log("fetching movies: " + this._getMediaUrl())
    this.setState({ loading: true })
    fetch(this._getMediaUrl())
      .then((data) => {
        return data.json()
      })
      .then((resp) => {
        console.log(resp)
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

  _onPressMedia(id) {
    if (!this.store.isDeviceSelected()) {
      Alert.alert("No device selected. Please go to settings.")
    }
    fetch(`${this.store.getBaseurl()}/media/${id}/cast`, {
      method: 'POST',
      headers: this.store.getHeaders()
    })
    .then(() => {
      this.store.setCurrentMedia(id, 'playing')
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error casting media.")
    })
  }

  _renderItem(item) {
    return (
      <MediaItem
        onPress={this._onPressMedia.bind(this)}
        id={item._id}
        name={item.name}
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
