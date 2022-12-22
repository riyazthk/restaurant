/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {color, typography} from '../theme';

export const Header = ({title = null, style, handleBack = () => {}}) => {
  return (
    <>
      <StatusBar backgroundColor={color.palette.btnColor} />
      <View style={[{backgroundColor: color.palette.btnColor}, style]}>
        <View style={styles.headerView}>
          <Pressable
            style={{position: 'absolute'}}
            onPress={() => {
              handleBack();
            }}>
            <Text style={[styles.text]}>Back</Text>
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={[styles.text]}>{title}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: color.palette.white,
    fontFamily: typography.primaryBalooThambi2,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});
