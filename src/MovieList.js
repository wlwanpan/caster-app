import React,{ Component } from 'react'
import { ScrollView, Alert } from 'react-native'
import { List, Text } from 'native-base'
import Item from './Item'

export default class MovieList extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    if (this.props.baseurl == '') {
      return
    }
    console.log("fetching movies")
    fetch(`${this.props.baseurl}/media?type=audio`)
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      this.setState({movies: resp.data})
      console.log(this.state.movies);
    })
  }

  _onPressMovie(id) {
    fetch(`${this.props.baseurl}/media/${id}/cast`, {
      method: 'POST',
      headers: this.props.headers
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
      <Item
        onPress={this._onPressMovie.bind(this)}
        id={item._id}
        name={item.name}/>
    )
  }

  render() {
    return (
      <ScrollView>
        <List
          dataArray={this.state.movies}
          renderRow={this._renderItem.bind(this)} />
      </ScrollView>
    )
  }
}