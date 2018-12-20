import React, { Component } from 'react'
import { Container, Text } from 'native-base'
import SearchHeader from './components/SearchHeader'
import Placeholder from './components/Placeholder'

export default class Music extends Component {
  render() {
    return (
      <Container>
        <SearchHeader />
        <Placeholder text="No music available."/>
      </Container>
    )
  }
}
