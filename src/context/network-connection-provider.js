import React, {memo, useEffect, useState} from 'react';
import {View} from 'react-native';
import {NetworkConnectionError} from '../screens';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = React.createContext({isConnected: true});

export const NetworkConnectionProvider = memo(({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let netinfoUnsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    return netinfoUnsubscribe;
  }, []);

  const handleConnectivityChange = connection => {
    setIsConnected(connection.isConnected);
  };

  const checkNetworkStatus = () => {
    return <View>{!isConnected && <NetworkConnectionError />}</View>;
  };

  return (
    <NetworkContext.Provider value={isConnected}>
      {checkNetworkStatus()}
      {children}
    </NetworkContext.Provider>
  );
});
