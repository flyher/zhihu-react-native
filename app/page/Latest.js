import React, { Component } from 'react';
import {
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
import ImgDes from '../component/ImgDes';

import { URL_LATEST } from '../util/Config';
import { VERSION } from '../util/Config';

let rate = 0.95;
let { width, height } = Dimensions.get('window');

let refreshCircleColors = ['#ff0000', '#00ff00', '#0000ff', '#123456'];
let refreshBgColor = '#ffffff';

export default class LatestContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'zhihu-react-native' + VERSION
    // headerRight: <Text style={styles.headerRight}>v 0.01</Text>,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false
    };
  }

  getInitialState () {
    return {};
  }

  componentDidMount () {
    this.fetchLatest();
  }

  fetchLatest () {
    return fetch(URL_LATEST)
      .then(response => response.json())
      .then(responseJson => {
        let stories = responseJson.stories;
        let top_stories = responseJson.top_stories;
        let all_stories = [];
        let new_stories = [];
        stories.forEach((item, i) => {
          item.key = all_stories.length;
          all_stories.push(item);
        });
        top_stories.forEach((item, i) => {
          item.key = all_stories.length;
          all_stories.push(item);
        })
        // sort
        all_stories.sort((a, b) => {
          return a.id - b.id;
        })
        // remove duplicates
        all_stories.forEach(item => {
          if (new_stories.length === 0) {
            new_stories.push(item)
          }
          if (new_stories.length > 0 && item.id !== new_stories[new_stories.length - 1].id) {
            new_stories.push(item)
          }
        })

        // for (var i = 0; i < stories.length; i++) {
        //   stories[i].key = i;
        // }
        // for (var i = 0; i < top_stories.length; i++) {
        //   top_stories[i].key = i;
        // }

        this.setState({
          isLoading: false,
          isRefreshing: false,
          stories: stories,
          top_stories: top_stories,
          all_stories: all_stories,
          new_stories: new_stories,
          date: responseJson.date
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onRefresh () {
    this.setState({ isRefreshing: true });
    this.fetchLatest();
  }

  render () {
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
        <FlatList
          style={styles.flatlist}
          data={this.state.new_stories}
          rate={rate}
          renderItem={({ item }) => (
            <ImgDes
              children={item}
              onParentGotoDetail={item => navigate('Detail', { story: item })}
            />
          )}
          horizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {},
  title: {
    textAlign: 'center'
  },
  flatlist: {},
  refreshLayout: {
    flex: 1
  },
  headerRight: {
    paddingRight: 0.1 * width * 0.5
  }
});
