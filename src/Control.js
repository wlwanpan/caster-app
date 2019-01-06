import React, { Component } from 'react'
import { Container, Header, Body, Right, Title,
         Button, Content, Text } from 'native-base'

import { Actions } from 'react-native-router-flux'

export default class Control extends Component {
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
          <Text>Controls</Text>
        </Content>
      </Container>
    )
  }
}