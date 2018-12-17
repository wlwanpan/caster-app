import React, { Component } from 'react'
import { Header, Item, Icon, Input, Text, Button } from 'native-base'

export default class SearchHeader extends Component {

  _onChange(search) {
    console.log("Search value: " + search)
    fetch(`${this.props.searchUrl}&search=${search}`)
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      this.props.onSearch(resp.data)
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