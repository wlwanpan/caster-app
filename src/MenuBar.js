import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class MenuBar extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            onPress= {() => {Actions.movies(this.props)}}
            vertical>
            <Icon name="md-videocam" />
            <Text>Movies</Text>
          </Button>
          <Button
            onPress= {() => {Actions.musics(this.props)}}
            vertical>
            <Icon name="md-musical-notes" />
            <Text>Music</Text>
          </Button>
          <Button
            onPress={() => { Actions.controls(this.props) }}
            vertical>
            <Icon name="md-options" />
            <Text>Controls</Text>
          </Button>
          <Button
            onPress= {() => {Actions.settings(this.props)}}
            vertical>
            <Icon active name="md-settings" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}