import React, {useContext} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {isEmpty} from 'lodash';

import {PostContext} from '../context';

interface ComponentProps {
  style?: StyleProp<ViewStyle>;
}

export type PostsProps = ComponentProps;

export const Posts = ({style}: PostsProps) => {
  const {posts} = useContext(PostContext);

  return (
    <SafeAreaView style={styles.container}>
      {!isEmpty(posts) && (
        <FlatList
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => {
            return (
              <>
                <View style={[styles.itemContainerStyle, style]}>
                  <Text>{`${item.id}: ${item.body} - `}</Text>
                  <Text style={styles.itemTextStyle}>{item.random_number}</Text>
                </View>
              </>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemContainerStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.4,
      height: 0.4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemTextStyle: {
    fontWeight: 'bold',
  },
});
