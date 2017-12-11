// lib
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
// page
import LatestContainer from './page/Latest';
import DetailContainer from './page/Detail';

const App = StackNavigator({
  Latest: { screen: LatestContainer },
  Detail: { screen: DetailContainer }
});

AppRegistry.registerComponent('zhihuReactNative', () => App);
