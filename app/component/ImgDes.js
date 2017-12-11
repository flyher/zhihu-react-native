import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PixelRatio,
  Dimensions,
  Button,
  Alert
} from 'react-native';
import Img from './Img';
import { StackNavigator } from 'react-navigation';

let rate = 0.95;
let { width, height } = Dimensions.get('window');
export default class ImgDesScreen extends Component {
  render() {
    return (
      <View style={styles.imgdes}>
        <View style={styles.box}>
          <View style={styles.logo}>
            <Img children={this.props.children.images} style={[styles.image]} />
          </View>
          <View style={styles.describe} >
            <Text style={styles.text} onPress={() => this.props.onParentGotoDetail(this.props.children)} >
              {this.props.children.title}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgdes: {
    width: width,
    alignItems: "center"
  },
  box: {
    width: width * rate,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E9E9E9',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#CACACA',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
  },
  logo: {
    width: 0.34 * width * rate,
    height: 0.25 * width,
    backgroundColor: 'white',
    paddingTop: 0.01 * width * 0.5
  },
  describe: {
    width: 0.65 * width * rate,
    height: 0.25 * width,
    backgroundColor: 'white'
  },
  image: {
    width: 0.32 * width * rate,
    height: 0.24 * width,
    borderRadius: 5
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  }
})
