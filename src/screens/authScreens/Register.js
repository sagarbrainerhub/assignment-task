import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import {CustomInput, PrimaryButton} from '../../components';
import Colors from '../../assets/Colors';
import {SecondaryText} from '../../assets/CustomText';

const Register = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.nameView}>
        <CustomInput
          placeholder="First Name"
          value={firstName}
          onChangeText={value => setFirstName(value)}
          width={wp(43)}
        />

        <CustomInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={value => setLastName(value)}
          width={wp(43)}
        />
      </View>

      <CustomInput
        placeholder="Email"
        secureTextEntry
        value={email}
        onChangeText={value => setEmail(value)}
      />

      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={value => setPassword(value)}
      />

      <CustomInput
        placeholder="Mobile"
        value={mobile}
        onChangeText={value => {
          setMobile(value);
        }}
        keyboardType="numeric"
      />

      <PrimaryButton
        text="Register"
        textColor={Colors.white}
        containerStyle={styles.buttonStyle}
        onPress={() => navigation.navigate('Login')}
      />

      <View style={styles.goToReg}>
        <SecondaryText text="Already have an account ? " />

        <SecondaryText
          text="Login now"
          textColor={Colors.lightGreen}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(4.5),
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: hp(5),
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(10),
  },
  goToReg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(40),
  },
});
