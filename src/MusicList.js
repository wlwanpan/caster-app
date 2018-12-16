import React, { Component } from 'react'
import { Container, Text } from 'native-base'
import HeaderBar from './HeaderBar'

export default class MusicList extends Component {
  render() {
    return (
      <Container>
        <HeaderBar />
        <Text>Music List</Text>
      </Container>
    )
  }
}
