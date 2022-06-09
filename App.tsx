/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {PostsProvider} from './src/context';
import {HomeScreen} from './src/screens';

const App: () => Node = () => {
  return (
    <>
      <PostsProvider>
        <HomeScreen />
      </PostsProvider>
    </>
  );
};

export default App;
