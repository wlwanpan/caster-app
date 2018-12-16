import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Assembler from './src/Assembler'

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <Assembler />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
