import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {color} from '../../theme';

export function Loader(props) {
  const {
    style: styleOverride,
    loaderStyle: loaderStyleOverride,
    color: loaderColor = color.palette.btnColor,
    size = 'small',
  } = props;

  const appBackGroundColor = useSelector(state => state?.auth?.backGroundColor);

  return (
    <View
      style={[
        styles.container,
        styleOverride,
        {
          backGroundColor:
            appBackGroundColor === 'black'
              ? color.palette.black
              : color.palette.white,
        },
      ]}>
      <View
        style={[
          styles.loader,
          loaderStyleOverride,
          {
            backGroundColor:
              appBackGroundColor === 'black'
                ? color.palette.black
                : color.palette.white,
          },
        ]}>
        <ActivityIndicator color={loaderColor} size={size} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {paddingBottom: 100},
});
