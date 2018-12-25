import React, { Component } from 'react'
import { Container } from 'native-base'

import SearchHeader from './components/SearchHeader'
import MediaList from './components/MediaList'

export default class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  render() {
    return (
      <Container>
        <SearchHeader
          mediaType={'video'}
          onSearch={(movies) => {this.setState({movies})}}
          />
        <MediaList
          media={this.state.movies}
          mediaType={'video'}
          onChange={(movies) => this.setState({movies})}
          />
      </Container>
    )
  }
}
