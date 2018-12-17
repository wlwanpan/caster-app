import React, { Component } from 'react'
import { Container, Text } from 'native-base'
import SearchHeader from './components/SearchHeader'

export default class Music extends Component {
  render() {
    return (
      <Container>
        <SearchHeader />
        <Text>Music List</Text>
      </Container>
    )
  }
}
