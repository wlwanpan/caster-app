import React,{ Component } from 'react'
import { ScrollView, RefreshControl, Alert } from 'react-native'
import { Container, List, Text, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import MediaItem from './components/MediaItem'
import SearchHeader from './components/SearchHeader'

import { updateMovies } from './actions/app'

class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
      movies: []
    }
  }

  componentDidMount() {
    let baseurl = this.props.config.baseurl
    if (baseurl && baseurl != '') {
      this._fetchMovies()
    }
  }

  _getMovieUrl() {
    return `${this.props.config.baseurl}/media?type=audio`
  }

  _fetchMovies() {
    console.log("fetching movies: " + this.props.config.baseurl)
    this.setState({loading: true})
    fetch(this._getMovieUrl())
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      console.log(resp)
      this.props.updateMovies(resp.data)
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  _onPressMovie(id) {
    if (this.props.config.headers['device-uuid'] == "") {
      Alert.alert("No device selected. Please go to settings.")
    }
    fetch(`${this.props.config.baseurl}/media/${id}/cast`, {
      method: 'POST',
      headers: this.props.config.headers
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
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
          onSearch={(movies) => {this.props.updateMovies(movies)}}
          searchUrl={this._getMovieUrl()}/>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._fetchMovies.bind(this)}/>
        }>
          {this.state.loading ? (
            <Spinner color='blue'/>
          ) : (
            <List
              dataArray={this.props.movies}
              renderRow={this._renderItem.bind(this)} />
          )}
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    config: state.app.config,
    movies: state.app.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovies: (movies) => {
      dispatch(updateMovies(movies))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)