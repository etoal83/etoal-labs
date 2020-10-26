import Header from '../components/Header';
import EarthLab from './labs/earth-lab';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => (
  <View style={styles.container}>
    <Header />
    <EarthLab />
  </View>
);

export default Home;
