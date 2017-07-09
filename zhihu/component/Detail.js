import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  WebView,
  Dimensions,
  Alert,
  Button,
  Clipboard,
  Linking
} from 'react-native';
import { StackNavigator } from 'react-navigation';

let BASE_URL = 'https://news-at.zhihu.com/api/4/news/';
let SPACE_HTML = '<div class="img-place-holder"></div>';
let ZHIHU_CSS = 'https://daily.zhihu.com/css/share.css?v=5956a';
let Base_share_url = 'https://daily.zhihu.com/story/';
let rate = 0.95;
let { width, height } = Dimensions.get('window');

class DetailContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Text style={styles.headerRight} onPress={navigation.state.params.navigateCopyUrl}>分享</Text>,
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      isLoading: true,
      story: params.story
    };
  }

  componentDidMount() {
    this.fetchStory();
    this.defineNav();
  }

  fetchStory() {
    let url = BASE_URL + (this.state.story.id).toString();
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let content = responseJson;
        content.body = content.body.replace(SPACE_HTML, '<div class="img-wrap">\
        <h1 class="headline-title">'+ content.title + '</h1>\
        <span class="img-source">图片：'+ content.image_source + '</span>\
        <img src="'+ content.image + '" alt=""></div>');
        let html = '<!DOCTYPE html><html><head>\
          <link rel="stylesheet" type="text/css" href="'+ ZHIHU_CSS + '" />\
          </head>\
          <body>'+ content.body + '</body></html>';
        content.html = html;
        this.setState({
          isLoading: false,
          content: content
        });
        this.props.navigation.setParams({
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  defineNav() {
    let params = this.state;
    this.props.navigation.setParams({
      navigateCopyUrl: this.copyUrl(params)
    })
  }

  copyUrl(params) {
    Clipboard.setString(Base_share_url + params.story.id.toString());
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.webView}>
          <WebView style={styles.content}
            source={{ html: this.state.content.html }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_copyurl: {
  },
  webView: {

  },
  content: {
    flex: 1,
    width: width
  },
  headerRight: {
    paddingRight: 0.1 * width * 0.5
  }
})


export default DetailContainer;