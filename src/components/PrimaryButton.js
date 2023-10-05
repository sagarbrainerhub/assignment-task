import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {PrimaryText} from '../assets/CustomText';
import Colors from '../assets/Colors';

const PrimaryButton = props => {
  const {text, textColor, backgroundColor, containerStyle, onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyle,
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.lightGreen,
          width: widthPercentageToDP(50),
        },
      ]}>
      <PrimaryText text={text} textColor={textColor} />
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: heightPercentageToDP(1),
    alignItems: 'center',
  },
});
