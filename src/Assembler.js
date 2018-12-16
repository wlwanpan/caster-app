import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { Router, Scene } from 'react-native-router-flux'
import HeaderBar from './HeaderBar'
import MenuBar from './MenuBar'
import MovieList from './MovieList'
import MusicList from './MusicList'
import Settings from './Settings'

export default class Assembler extends Component {

  constructor(props) {
    super(props)
    this.state = {
      baseurl: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@App:settings')
    .then((resp) => {
      let { addr, port, defaultDevice } = JSON.parse(resp)
      let baseurl = `http://${addr}:${port}`
      let headers = {
        ...this.state.headers,
        'device-uuid': defaultDevice
      }
      this.setState({baseurl, headers})
    })
  }

  render() {
    return (
      <Container>
        <HeaderBar />
        <Router
          headerMode="screen">
          <Scene key="root" baseurl={this.state.baseurl} headers={this.state.headers}>
            <Scene key="movies" component={MovieList} initial={true} hideNavBar="true"/>
            <Scene key="musics" component={MusicList} hideNavBar="true"/>
            <Scene key="settings" component={Settings} hideNavBar="true"/>
          </Scene>
        </Router>
        <MenuBar />
      </Container>
    )
  }
}
