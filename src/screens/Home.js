import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {IconButton} from '../components';

const Home = () => {
  const isFocus = useIsFocused();
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState();

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
          setCurrentUser(documentSnapshot.data());
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

  const onLogoutPress = () => {
    Alert.alert('', 'Are you sure, You want to Logout ?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          auth()
            .signOut()
            .then(() => {
              navigation.navigate('AuthStack');
            });
        },
      },
    ]);
  };

  return (
    <View style={styles.mainConatiner}>
      {isAdmin ? (
        <>
          <View style={styles.header}>
            <PrimaryText
              text="Welcome to your Admin Panel !"
              textColor={Colors.lightGreen}
              style={styles.title}
            />

            <IconButton
              type="MaterialIcons"
              name="logout"
              onPress={onLogoutPress}
            />
          </View>

          <FlatList
            data={userData}
            renderItem={renderUser}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '60%',
                }}>
                <Text style={{color: 'black', fontSize: 20}}>
                  No data found!
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <PrimaryText
              text={`Welcome ${currentUser?.firstName} ${currentUser?.lastName}`}
              textColor={Colors.lightGreen}
            />

            <IconButton
              type="MaterialIcons"
              name="logout"
              onPress={onLogoutPress}
            />
          </View>

          <View style={styles.detailList}>
            <SecondaryText text="Your Email" />
            <PrimaryText text={currentUser?.email} />
          </View>

          <View style={styles.detailList}>
            <SecondaryText text="Your Mobile number" />
            <PrimaryText text={currentUser?.mobile} />
          </View>

          <View style={styles.detailList}>
            <SecondaryText text="Your UserType" />
            <PrimaryText
              text={currentUser?.userType === 1 ? 'Admin' : 'Regular'}
            />
          </View>
        </>
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
  header: {
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailList: {
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(2),
  },
});
