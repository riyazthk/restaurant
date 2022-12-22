import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  getauthToken,
  getLoginType,
  getUserEmail,
  getuserName,
} from '../redux/slices/authSlice';

function LocalStorageData({userId, Token, Name, type, email}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const putUserData = async (userId, Token, Name, type, email) => {
      try {
        await AsyncStorage.setItem('userID', JSON.stringify(userId));
        await AsyncStorage.setItem('Token', Token);
        await AsyncStorage.setItem('Name', Name);
        if (type === 'guest') {
          await AsyncStorage.setItem('guest', 'true');
        }
        await AsyncStorage.setItem('LogInType', type);
        await AsyncStorage.setItem('emailId', email);
        // dispatch(getAuthId(userId));
        dispatch(getauthToken(Token));
        dispatch(getuserName(Name));
        dispatch(getUserEmail(email));
        dispatch(getLoginType(type));
      } catch (e) {
        console.log('err', e);
      }
    };
    putUserData(userId, Token, Name, type, email);
  }, [Name, Token, dispatch, email, type, userId]);
}

export default LocalStorageData;
