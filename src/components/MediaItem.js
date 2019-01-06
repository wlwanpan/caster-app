import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon, Left, Body, Right,
         Button, Text, Thumbnail } from 'native-base'

export default class MediaItem extends Component {

  _onPlay() {
    this.props.onPlay(this.props.id)
  }

  _onPause() {
    this.props.onPause(this.props.id)
  }

  _onPress() {
    if (this.props.stateType == 'paused') {
      this._onPlay()
    } else {
      this._onPause()
    }
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
          {this.props.stateType == 'playing' ? (
            <Button
              onPress={this._onPlay.bind(this)}
              transparent>
              <Icon name='md-pause' />
            </Button>
          ) : (
            <Button
              onPress={this._onPause.bind(this)}
              transparent>
              <Icon name='md-play' />
            </Button>
          )}
        </Right>
      </ListItem>
    )
  }
}
