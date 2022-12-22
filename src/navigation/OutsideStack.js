import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {LogIn} from '../screens';
import {Routes} from './routes';

const Stack = createStackNavigator();
export const OutsideStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.LOGIN} component={LogIn} />
    </Stack.Navigator>
  );
};
