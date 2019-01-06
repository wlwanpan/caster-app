import React, { Component } from 'react'
import { ListItem, Button, Icon } from 'native-base'

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
            bordered large
            onPress={this._onPress.bind(this)}>
          </Button>
        ) : (
          <Button
            transparent large
            onPress={this._onPress.bind(this)} full>
          </Button>
        )}
      </ListItem>
    )
  }
}