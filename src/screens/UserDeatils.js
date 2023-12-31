import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import {CustomInput, IconButton} from '../components';
import Colors from '../assets/Colors';
import firestore from '@react-native-firebase/firestore';
import {Dropdown} from 'react-native-element-dropdown';
import {UserType} from '../MockData';

const UserDeatils = ({route}) => {
  const {userInfo} = route.params;

  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [email, setEmail] = useState(userInfo?.email);
  const [mobile, setMobile] = useState(userInfo?.mobile);
  const [userType, setUserType] = useState(userInfo?.userType);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    Alert.alert('', 'As an admin, You can change the details of any user.', [
      {
        text: 'Ok',
      },
    ]);
  }, []);

  const onPressSave = async () => {
    try {
      await firestore()
        .collection('Users')
        .doc(userInfo?.userId)
        .update({
          email: email,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          userType: userType,
        })
        .then(() => {
          setEditable(false);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          type="Entypo"
          name="back"
          onPress={() => {
            navigation.goBack();
          }}
        />

        {editable ? (
          <IconButton
            type="Feather"
            name="save"
            onPress={() => {
              if (
                firstName?.length === 0 ||
                lastName?.length === 0 ||
                email?.length === 0 ||
                mobile?.length === 0
              ) {
              } else {
                onPressSave();
              }
            }}
          />
        ) : (
          <IconButton
            type="Feather"
            name="edit"
            onPress={() => {
              setEditable(true);
            }}
          />
        )}
      </View>

      <View style={styles.infoView}>
        <CustomInput
          value={firstName}
          editable={editable}
          onChangeText={value => setFirstName(value)}
        />
        <CustomInput
          value={lastName}
          editable={editable}
          onChangeText={value => setLastName(value)}
        />
        <CustomInput
          value={email}
          editable={editable}
          onChangeText={value => setEmail(value)}
        />
        <CustomInput
          value={mobile}
          editable={editable}
          onChangeText={value => setMobile(value)}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={{color: editable ? 'black' : Colors.lightGray}}
          data={UserType}
          value={userType}
          labelField="label"
          valueField="value"
          placeholder="User Type"
          disable={!editable}
          onChange={item => {
            setUserType(item.value);
          }}
        />
      </View>
    </View>
  );
};

export default UserDeatils;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoView: {
    marginTop: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
  },
  dropdown: {
    borderBottomWidth: 0.5,
    borderColor: Colors.lightGray,
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
  },
  placeholderStyle: {
    color: Colors.lightGray,
  },
});
