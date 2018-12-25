import React, { Component } from 'react'
import { Header, Item, Icon, Input, Text, Button } from 'native-base'

import Store from '../../store'

export default class SearchHeader extends Component {

  constructor(props) {
    super(props)
    this.store = Store.getInstance()
  }

  _getMediaUrl() {
    return `${this.store.getBaseurl()}/media?type=${this.props.mediaType}`
  }

  _onChange(search) {
    fetch(`${this._getMediaUrl()}&search=${search}`)
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      this.props.onSearch(resp.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            onChangeText={this._onChange.bind(this)}
            placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
    )
  }
}