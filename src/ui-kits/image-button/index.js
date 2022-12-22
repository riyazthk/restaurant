/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {color, typography} from '../../theme';
import {Loader} from '../loader';
import {Text} from '../text';

export function ImageButton({
  onPress,
  title,
  loading,
  icon,
  viewStyle,
  textStyle,
  imageColor,
}) {
  return (
    <View style={[styles.btnView]}>
      <TouchableWithoutFeedback
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.rowView, viewStyle]}>
          {!loading ? (
            <>
              <Image source={icon} style={[styles.icon, imageColor]} />
              <Text style={[styles.btnText, textStyle]}>{title}</Text>
            </>
          ) : (
            <Loader
              loaderStyle={{paddingBottom: 0}}
              style={{
                backgroundColor: 'transparent',
              }}
              color={color.palette.white}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  btnView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
  btnText: {
    fontFamily: typography.secondary,
    fontSize: 16,
    lineHeight: 20.11,
    color: color.palette.btnColor,
    marginRight: 10,
  },
  close: {
    alignSelf: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    // backgroundColor: color.palette.btnColor,
    borderWidth: 1,
    borderColor: color.palette.btnColor,
    // height: 33,
    borderRadius: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    height: 15,
    width: 15,
    tintColor: color.palette.btnColor,
    marginRight: 10,
    marginVertical: 7,
    marginLeft: 10,
  },
});
