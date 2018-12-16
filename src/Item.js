import React, { Component } from 'react'
import { ListItem } from 'native-base'
import { Text, TouchableOpacity } from 'react-native'

export default class Item extends Component {

  _onPress() {
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <ListItem style={{
        marginTop: 3,
        marginBottom: 3
      }}>
        <TouchableOpacity
          onPress={this._onPress.bind(this)}>
          <Text>{this.props.name}</Text>
        </TouchableOpacity>
      </ListItem>
    )
  }
}
