import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from '../assets/Colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {PrimaryText, SecondaryText} from '../assets/CustomText';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Home = () => {
  const isFocus = useIsFocused();
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const navigation = useNavigation();

  const getUserData = async () => {
    try {
      const userId = auth().currentUser?.uid;
      await firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then(async documentSnapshot => {
          const admin = documentSnapshot.data().userType == 1 ? true : false;
          setIsAdmin(admin);
          if (admin) {
            await firestore()
              .collection('Users')
              .where('userId', '!=', userId)
              .where('userType', '==', 2)
              .get()
              .then(async documentSnapshot => {
                setUserData(documentSnapshot.docs);
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isFocus]);

  const renderUser = ({item}) => {
    const userInfo = item?._data;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('UserDeatils', {userInfo})}>
        <SecondaryText text={userInfo?.email} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainConatiner}>
      {isAdmin ? (
        <>
          <PrimaryText
            text="Welcome to your Admin Panel !"
            textColor={Colors.lightGreen}
            style={styles.title}
          />

          <FlatList data={userData} renderItem={renderUser} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(1.5),
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: widthPercentageToDP(4),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 6,
  },
  title: {
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
  },
});
