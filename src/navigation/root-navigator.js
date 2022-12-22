import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {OutsideStack} from './OutsideStack';
import {InsideStack} from './InsideStack';

const Stack = createStackNavigator();

export const RootNavigator = React.forwardRef((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Routes.OUTSIDE_STACK} component={OutsideStack} />
        <Stack.Screen name={Routes.INSIDE_STACK} component={InsideStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
