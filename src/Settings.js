import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Header, Body, Right, Title, Button, Container,
         Content, Form, Text, Item, Label, Input } from 'native-base'
import { Actions } from 'react-native-router-flux'
import DeviceList from './components/DeviceList'

import Store from '../store'

export default class Settings extends Component {

  constructor(props) {
    super(props)
    this.store = Store.getInstance()
    this.state = {
      ...this.store.getSettings(),
      devices: []
    }
  }

  _onSave() {
    let { addr, port, defaultDevice } = this.state
    this.store.saveSettings({ addr, port, defaultDevice })
    .then((resp) => {
      console.log(resp)
      Alert.alert("Settings successfully saved.")
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error saving settings.")
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{marginLeft: 6}}>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => Actions.pop()}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel style={itemStyle}>
              <Label>Host Addr</Label>
              <Input
                onChangeText={(addr) => this.setState({addr})}
                value={this.state.addr}/>
            </Item>
            <Item stackedLabel style={itemStyle}>
              <Label>Host Port</Label>
              <Input
                onChangeText={(port) => this.setState({port})}
                value={this.state.port}/>
            </Item>
            <Item stackedLabel style={itemStyle} last>
              <Label>Available Devices</Label>
              <DeviceList
                store={this.store}
                selectedUUID={this.state.defaultDevice.uuid}
                onPress={(defaultDevice) => this.setState({defaultDevice})}/>
            </Item>
          </Form>
          <Button
            style={{ marginRight: 10, marginLeft: 10 }}
            block
            onPress={this._onSave.bind(this)}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const itemStyle = {
  marginTop: 10
}
