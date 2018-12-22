import React,{ Component } from 'react'
import { ScrollView, RefreshControl, Alert } from 'react-native'
import { Container, List, Spinner } from 'native-base'

import MediaItem from './components/MediaItem'
import SearchHeader from './components/SearchHeader'
import Placeholder from './components/Placeholder'

import Store from '../store'

export default class Movie extends Component {

  constructor(props) {
    super(props)
    this.store = Store.getInstance()
    this.state = {
      refreshing: false,
      loading: false,
      movies: []
    }
  }

  componentDidMount() {
    let { addr, port } = this.store.getSettings()
    if (addr && port) {
      this._fetchMovies()
    }
  }

  _getMovieUrl() {
    return `${this.store.getBaseurl()}/media?type=audio`
  }

  _fetchMovies() {
    console.log("fetching movies: " + this._getMovieUrl())
    this.setState({loading: true})
    fetch(this._getMovieUrl())
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      console.log(resp)
      // this.props.updateMovies(resp.data)
      this.setState({movies: resp.data})
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error loading movies.")
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  _onPressMovie(id) {
    if (!this.store.isDeviceSelected()) {
      Alert.alert("No device selected. Please go to settings.")
    }
    fetch(`${this.store.getBaseurl()}/media/${id}/cast`, {
      method: 'POST',
      headers: this.store.getHeaders()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error casting media.")
    })
  }

  _renderItem(item) {
    return (
      <MediaItem
        onPress={this._onPressMovie.bind(this)}
        id={item._id}
        name={item.name}/>
    )
  }

  render() {
    return (
      <Container>
        <SearchHeader
          onSearch={(movies) => {this.setState({movies})}}
          searchUrl={this._getMovieUrl()}/>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._fetchMovies.bind(this)}/>
        }>
          {(() => {
            if (this.state.loading) {
              return (
                <Spinner color='blue' />
              )
            } else if (this.state.movies == 0) {
              return (
                <Placeholder text="No movies available." />
              )
            } else {
                return (
                  <List
                    dataArray={this.state.movies}
                    renderRow={this._renderItem.bind(this)} />
                )
            }
          })()}
        </ScrollView>
      </Container>
    )
  }
}
