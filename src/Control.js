import React, { Component } from 'react'
import { Slider } from 'react-native'
import { Container, Header, Body, Right, Title,
         Button, Content, Text } from 'native-base'

import { Actions } from 'react-native-router-flux'

export default class Control extends Component {

  constructor(props) {
    super(props)
    this.state = {
      volume: 0
    }
  }

  _onVolumeChange(vol) {
    console.log(vol)
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{ marginLeft: 6 }}>Controls</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => Actions.pop()}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>Volume</Text>
          <Slider
            step={10}
            maximumValue={100}
            onValueChange={this._onVolumeChange.bind(this)}
            value={this.state.volume} />
        </Content>
      </Container>
    )
  }
}