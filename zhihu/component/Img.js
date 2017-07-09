import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class Img extends Component {
  render() {
    let pic = {
      uri: this.props.children.length > 0 ? this.props.children[0] : ''
    }
    return (
      <Image source={pic} style={[styles.image, this.props.style]} />
    )
  }
}

const styles = StyleSheet.create({
  image: {
  }
})