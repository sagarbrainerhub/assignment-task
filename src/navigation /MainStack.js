import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './Stacks/AuthStack';
import {Home, UserDeatils} from '../screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />

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

export default MainStack;
