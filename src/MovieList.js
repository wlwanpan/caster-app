import React,{ Component } from 'react'
import { ScrollView, RefreshControl, Alert } from 'react-native'
import { Container, List, Text, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Item from './Item'
import HeaderBar from './HeaderBar'

export default class MovieList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
      movies: []
    }
  }

  componentDidMount() {
    if (this.props.config.baseurl != '') {
      this._fetchMovies()
    }
  }

  _fetchMovies() {
    console.log("fetching movies")
    this.setState({loading: true})
    fetch(`${this.props.config.baseurl}/media?type=audio`)
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      this.setState({movies: resp.data})
      console.log(this.state.movies)
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  _onPressMovie(id) {
    fetch(`${this.props.config.baseurl}/media/${id}/cast`, {
      method: 'POST',
      headers: this.props.config.headers
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error casting media.")
    })
  }

  _onRefresh() {
    Actions.refresh(this.props)
  }

  _renderItem(item) {
    return (
      <Item
        onPress={this._onPressMovie.bind(this)}
        id={item._id}
        name={item.name}/>
    )
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}/>
    )
  }

  render() {
    return (
      <Container>
        <HeaderBar />
        <ScrollView refreshControl={this._refreshControl()}>
          {this.state.loading ? (
            <Spinner color='blue'/>
          ) : (
            <List
              dataArray={this.state.movies}
              renderRow={this._renderItem.bind(this)} />
          )}
        </ScrollView>
      </Container>
    )
  }
}