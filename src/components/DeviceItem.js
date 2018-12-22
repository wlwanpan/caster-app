import React, { Component } from 'react'
import { ListItem, Button, Text } from 'native-base'

export default class DeviceItem extends Component {

  _onPress() {
    this.props.onPress(this.props.device)
  }

  render() {
    return (
      <ListItem style={{
        marginTop: 3,
        marginBottom: 3
      }}>
        {this.props.selected ? (
          <Button
            bordered full
            onPress={this._onPress.bind(this)}>
            <Text>{this.props.device.name}</Text>
          </Button>
        ) : (
          <Button onPress={this._onPress.bind(this)} full>
            <Text>{this.props.device.name}</Text>
          </Button>
        )}
      </ListItem>

    )
  }
}