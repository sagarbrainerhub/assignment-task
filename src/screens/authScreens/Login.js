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
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onLoginPress = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        Password,
      );
      if (userCredential.user) {
        navigation.navigate('BottomTab');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        style={{marginTop: hp(15)}}
      />

      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={Password}
        onChangeText={value => setPassword(value)}
      />

      <PrimaryButton
        text="Login"
        textColor={Colors.white}
        containerStyle={styles.buttonStyle}
        onPress={onLoginPress}
      />

      <View style={styles.goToReg}>
        <SecondaryText text="Don't have an account ? " />

        <SecondaryText
          text="Register now"
          textColor={Colors.lightGreen}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

export default Login;

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
  goToReg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(50),
  },
});
