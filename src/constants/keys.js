// import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

export const NAVIGATION_PERSISTENCE_KEY = '@restaurant/navigation-state';
export const DEVICE_IP_ADDRESS = NetworkInfo.getIPAddress().then(ipAddress => {
  return ipAddress;
});
