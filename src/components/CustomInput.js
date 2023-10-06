import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../assets/Colors';

const CustomInput = props => {
  const {
    style,
    value,
    onChangeText,
    placeholder,
    width,
    secureTextEntry,
    keyboardType,
    editable,
  } = props;

  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onFocus={() => setFocused(!focused)}
      onBlur={() => setFocused(!focused)}
      placeholderTextColor={Colors.lightGray}
      editable={editable}
      style={[
        styles.container,
        style,
        {
          width: width,
          borderBottomColor:
            focused === true ? Colors.lightGreen : Colors.lightGray,
        },
      ]}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    borderBottomWidth: 1,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
});
