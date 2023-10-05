import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);

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
          if (!admin) {
            const users = await firestore().collection('Users').get();
            users.forEach(documentSnapshot => {
              setUserData(documentSnapshot.data());
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.mainConatiner}>
      <Text>{isAdmin ? 'User is Admin' : 'User is not admin'}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
