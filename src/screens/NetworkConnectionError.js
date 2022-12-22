import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../theme';
import {Screen} from '../ui-kits/screen';
import {Text} from '../ui-kits/text';

export function NetworkConnectionError() {
  return (
    <Screen variant={'scroll'}>
      <View style={styles.errorContainer}>
        <View>
          {/* <Image
            source={require('../../assets/illustrations/error.png')}
            style={styles.img}
          /> */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.subText}>
            Please check your network connectivity and try again
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
  img: {height: 120, width: 120},
  textContainer: {
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.palette.black,
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 50,
    textAlign: 'center',
    color: color.palette.black,
  },
});
