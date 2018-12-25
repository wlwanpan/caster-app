import React, { Component } from 'react'
import { Container } from 'native-base'

import SearchHeader from './components/SearchHeader'
import MediaList from './components/MediaList'

export default class Music extends Component {

  constructor(props) {
    super(props)
    this.state = {
      music: []
    }
  }

  render() {
    return (
      <Container>
        <SearchHeader
          mediaType={'audio'}
          onSearch={(music) => {this.setState({music})}}
          />
        <MediaList
          media={this.state.music}
          mediaType={'audio'}
          onChange={(music) => this.setState({music})}
          />
      </Container>
    )
  }
}
