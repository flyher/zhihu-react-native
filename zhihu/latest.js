import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  RefreshControl
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ImgDes from './component/ImgDes';
import DetailContainer from './component/Detail';

let rate = 0.95;
let { width, height } = Dimensions.get('window');
let BASE_URL = 'https://news-at.zhihu.com/api/4/news/latest';
let refreshCircleColors = ['#ff0000', '#00ff00', '#0000ff', '#123456'];
let refreshBgColor = '#ffffff';

class HomeContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'zhihu-react-native'
    // headerRight: <Text style={styles.headerRight}>v 0.01</Text>,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false
    }
  }

  getInitialState() {
    return {
    };
  }

  componentDidMount() {
    this.fetchLatest();
  }

  fetchLatest() {
    return fetch(BASE_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        let stories = responseJson.stories;
        let top_stories = responseJson.top_stories;
        for (var i = 0; i < stories.length; i++) {
          stories[i].key = i;
        }
        for (var i = 0; i < top_stories.length; i++) {
          top_stories[i].key = i;
        }

        this.setState({
          isLoading: false,
          isRefreshing: false,
          stories: stories,
          top_stories: top_stories,
          date: responseJson.date
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this.fetchLatest();
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
      <View style={styles.list}>
        <FlatList style={styles.flatlist} data={this.state.stories} rate={rate}
          renderItem={
            ({ item }) =>
              <ImgDes children={item} onParentGotoDetail={(item) => navigate('Detail', { story: item })}></ImgDes>
          }
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh.bind(this)} />
          }
        />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  list: {
  },
  title: {
    textAlign: 'center'
  },
  flatlist: {
  },
  refreshLayout: {
    flex: 1
  },
  headerRight: {
    paddingRight: 0.1 * width * 0.5
  }
})

const App = StackNavigator({
  Home: { screen: HomeContainer },
  Detail: { screen: DetailContainer }
});

AppRegistry.registerComponent('zhihuReactNative', () => App);
