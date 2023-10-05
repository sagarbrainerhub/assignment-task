import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

import {CustomInput, PrimaryButton} from '../../components';
import Colors from '../../assets/Colors';
import {SecondaryText} from '../../assets/CustomText';
import {UserType} from '../../MockData';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [userType, setUserType] = useState(null);

  const onPressRegister = () => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          const uid = user.uid;
          firestore()
            .collection('Users')
            .doc(uid)
            .set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              mobile: mobile,
              userType: userType,
              userId: uid,
            })
            .then(() => {
              navigation.navigate('Login');
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.placeholderStyle}
        data={UserType}
        value={userType}
        labelField="label"
        valueField="value"
        placeholder="User Type"
        onChange={item => {
          setUserType(item.value);
        }}
      />

      <PrimaryButton
        text="Register"
        textColor={Colors.white}
        containerStyle={styles.buttonStyle}
        onPress={() => onPressRegister()}
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
    marginTop: hp(32),
  },
  placeholderStyle: {
    color: Colors.lightGray,
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
});
