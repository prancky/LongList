import React, {useState, useContext} from 'react';

import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';

import {PostContext} from '../context';

export type ShearchFieldProps = TouchableOpacityProps &
  TextInputProps & {
    placeholderText: string;
    btn_label: string;
  };

export const Shearch = (props: TouchableOpacityProps) => {
  const {placeholderText, btn_label, ...restProps} = props;

  const {searchPosts, reRenderPosts} = useContext(PostContext);

  const [searchText, setSearchText] = useState<string>();

  return (
    <>
      <View>
        <TextInput
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            searchPosts(text);
          }}
          style={styles.inputContainerStyle}
          placeholder={placeholderText}
          {...restProps}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          reRenderPosts();
        }}
        activeOpacity={0.8}
        style={styles.btnContainerStyle}>
        <Text>{btn_label}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnContainerStyle: {
    height: 33,
    alignSelf: 'flex-start',
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#3AEA92',
    borderRadius: 5,
  },
});
