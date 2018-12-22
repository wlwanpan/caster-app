import React, { Component } from 'react'
import { Container } from 'native-base'
import { Router, Scene } from 'react-native-router-flux'

import MenuBar from './src/MenuBar'
import Movie from './src/Movie'
import Music from './src/Music'
import Settings from './src/Settings'

import Store from './store'

export default class App extends Component {

  componentDidMount() {
    let store = Store.getInstance()
    store.loadSettings()
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
