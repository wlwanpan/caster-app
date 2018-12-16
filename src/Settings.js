import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, ScrollView, Alert } from 'react-native'
import { Header, Button, Container, Content, Form, Text, Item, Label, Input } from 'native-base'
import DeviceList from './DeviceList'

export default class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addr: '192.168.1.70',
      port: '4040',
      defaultDevice: '',
      devices: []
    }
  }

  _onSave() {
    let { addr, port, defaultDevice } = this.state
    let settings = {addr, port, defaultDevice}
    let settingsAsStr = JSON.stringify(settings)
    AsyncStorage.setItem('@App:settings', settingsAsStr)
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
        <Content>
          <Form>
            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label>Host Addr</Label>
              <Input
                onChangeText={(addr) => this.setState({addr})}
                value={this.state.addr}/>
            </Item>
            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label>Host Port</Label>
              <Input
                onChangeText={(port) => this.setState({port})}
                value={this.state.port}/>
            </Item>
            <Item stackedLabel style={{ marginTop: 10 }} last>
              <Label>Available Devices</Label>
              <DeviceList onPress={(defaultDevice) => this.setState({defaultDevice})}/>
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
