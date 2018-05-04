import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default class Img extends Component {
  render () {
    let pic = {
      uri: ''
    }
    if (typeof (this.props.children) === 'object') {
      pic.uri = this.props.children.length > 0 ? this.props.children[0] : ''
    }
    else if (typeof (this.props.children) === 'string') {
      pic.uri = this.props.children
    }
    return (
      <View>
        <Image source={pic} style={[styles.image, this.props.style]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
  }
})