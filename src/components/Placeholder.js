import React, { Component } from 'react'
import { Card, CardItem, Body, Text }  from 'native-base'

export default class Placeholder extends Component {
  render() {
    return (
      <Card transparent>
        <CardItem>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{this.props.text}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}