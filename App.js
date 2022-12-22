import React, {useEffect, useRef, useState} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {NAVIGATION_PERSISTENCE_KEY} from './src/constants/keys';
import {useNavigationPersistence} from './src/navigation/navigation-utils';
import {RootNavigator} from './src/navigation';
import {store} from './src/redux/store';
import * as storage from './src/utils/storage';

import {NetworkConnectionProvider} from './src/context/network-connection-provider';
import {StoreAuth} from './src/components';
import {Loader} from './src/ui-kits/loader';

const App = () => {
  const navigationRef = useRef();
  const [loadLan, setLoadLang] = useState(true);
  const {initialNavigationState, onNavigationStateChange} =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NetworkConnectionProvider>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </NetworkConnectionProvider>
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
