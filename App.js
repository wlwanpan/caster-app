import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'

import MenuBar from './src/MenuBar'
import Movie from './src/Movie'
import Music from './src/Music'
import Settings from './src/Settings'

import { updateConfig } from './src/actions/app'

class App extends Component {

  componentDidMount() {
    AsyncStorage.getItem('@App:settings')
    .then((resp) => {
      console.log('Settings saved: ' + resp)
      let { addr, port, defaultDevice } = JSON.parse(resp)
      let baseurl = `http://${addr}:${port}`
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'device-uuid': defaultDevice
      }
      this.props.updateConfig({baseurl, headers})
    })
  }

  render() {
    return (
      <Container>
        <Router
          headerMode="screen">
          <Scene key="root" hideNavBar="true">
            <Scene key="movies" component={Movie} initial={true}/>
            <Scene key="musics" component={Music}/>
            <Scene key="settings" component={Settings}/>
          </Scene>
        </Router>
        <MenuBar />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateConfig: (config) => {
      dispatch(updateConfig(config))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)