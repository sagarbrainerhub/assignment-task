import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, UserDeatils} from '../../screens';

const Stack = createNativeStackNavigator();

const HomeStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="UserDeatils"
        component={UserDeatils}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStacks;
