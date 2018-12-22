import React, { Component } from 'react'
import { Alert } from 'react-native'
import { List, Spinner, Text, Content } from 'native-base'
import DeviceItem from './DeviceItem'

class DeviceList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      devices: []
    }
  }

  componentDidMount() {
    console.log('Fetching devices')
    this.setState({loading: true})
    fetch(`${this.props.config.baseurl}/devices`)
    .then((data) => {
      return data.json()
    })
    .then((resp) => {
      this.setState({devices: resp.data})
      console.log(this.state.devices)
    })
    .catch((err) => {
      Alert.alert("Error scanning devices.")
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  _onPressDevice(device) {
    this.props.onPress(device)
  }

  _renderDevices(item) {
    return (
      <DeviceItem 
        selected={this.props.selectedUUID == item.uuid}
        device={item}
        onPress={this._onPressDevice.bind(this)}/>
    )
  }

  render() {
    return (
      <Content>
        {this.state.loading ? (
          <Spinner color='blue'/>
        ) : (
          <List
            dataArray={this.state.devices}
            renderRow={this._renderDevices.bind(this)} />
        )}
      </Content>
    )
  }
}
