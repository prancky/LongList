/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useContext} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {images} from '../assets';
const {height, width} = Dimensions.get('window');

import {PostContext} from '../context';
import {Shearch, Posts} from '../components';

const Home: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {getPosts} = useContext(PostContext);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Image style={styles.herder} source={images.doggoWalk} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Shearch placeholderText={'Search Text'} btn_label={'Re-render'} />
        </View>
        <Posts />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  herder: {
    width: width,
    height: height / 3.5,
  },
});

export default Home;
