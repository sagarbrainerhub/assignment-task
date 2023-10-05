import {StyleSheet, Text} from 'react-native';

export function PrimaryText(props) {
  const {text, textColor} = props;
  return <Text style={[styles.primaryText, {color: textColor}]}>{text}</Text>;
}

export function SecondaryText(props) {
  const {text, textColor, onPress} = props;
  return (
    <Text style={[styles.secondaryText, {color: textColor}]} onPress={onPress}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
