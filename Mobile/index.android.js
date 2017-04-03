import React, { Component } from 'react';
import { Container, Content, Tabs , Button , Header , Title , Icon } from 'native-base';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';

import Index from './app/index';

class AwesomeProject  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={'#304FFE'}
          barStyle="light-content"
        />
        <Index />
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject );
