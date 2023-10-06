import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../assets/Icon';
import Colors from '../assets/Colors';

const IconButton = props => {
  const {type, name, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon type={type} name={name} color={Colors.white} size={20} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGreen,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 6,
  },
});
