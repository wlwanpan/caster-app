import React, { Component } from 'react'
import { TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { ListItem, Icon, Left, Body, Right,
         Button, Text, Thumbnail } from 'native-base'

export default class MediaItem extends Component {

  _onPress() {
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <ListItem style={{
        marginTop: 3,
        marginBottom: 3
      }}
      thumbnail>
        <Left>
          <Thumbnail square source={require('../assets/thumbnail.png')} />
        </Left>
        <Body>
          <TouchableOpacity onPress={this._onPress.bind(this)}>
            <Text>{this.props.metadata.title || this.props.name}</Text>
            <Text note numberOfLines={1}>{this.props.metadata.artist}</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='md-play'/>
          </Button>
        </Right>
      </ListItem>
    )
  }
}
