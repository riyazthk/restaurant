import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {Dashboard, Map} from '../screens';
import {Routes} from './routes';

const Stack = createStackNavigator();
export const InsideStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.DASHBOARD}
        component={Dashboard}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.MAP}
        component={Map}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
