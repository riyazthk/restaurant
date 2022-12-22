/* eslint-disable react-native/no-inline-styles */
import {flatten, mergeAll} from 'ramda';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Modal, Platform} from 'react-native';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {color, spacing, typography} from '../../theme';
import {Loader} from '../loader';
import {Text} from '../text';

const INPUT = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[3],
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-start',
  // height: 42,
};

const LABEL = {
  marginBottom: 12,
  fontSize: 16,
  color: color.palette.dark_grey2,
  lineHeight: 20.11,
};

const DISABLE = {
  backgroundColor: color.palette.switchBackgroundColor,
};

const VARIATIONS = {
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 4,
  },
  underline: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
  },
  danger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    borderRadius: 4,
  },
  disabled: {
    //borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 10,
    backgroundColor: color.palette.disableColor,
  },
};

const ICON_CONTAINER = {
  height: '100%',
  aspectRatio: 0.5,
  justifyContent: 'center',
  position: 'absolute',
  right: 5,
  marginRight: 5,
  marginLeft: 4,
};

const ICON = {
  width: 20,
  height: 20,
  // marginLeft: 20,
};

const PLACEHOLDER = {
  fontSize: 14,
  lineHeight: 17,
  letterSpacing: -0.14,
  fontFamily: typography.primary,
  color: color.palette.warmGrey,
};

const TEXTSTYLE = {
  lineHeight: 17,
  letterSpacing: -0.14,
  fontFamily: typography.primary,
  color: color.palette.black,
  fontSize: 14,
  // height: 40,
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export function Select(props) {
  const {
    placeholder,
    value,
    options,
    textStyle: textOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    placeholderStyle: placeholderStyleOverride,
    loading,
    onIconPress = () => {},
    onPress = () => {},
    icon,
    required,
    variant = 'bordered',
    label = ' ',
    disable = false,
    labelStyle: labelStyleOverride,
    style: styleOverride,
    source,
  } = props;

  let inputStyle = enhance({...INPUT, ...VARIATIONS[variant]});

  inputStyle = enhance(inputStyle, inputStyleOverride);

  inputStyle = disable ? enhance(inputStyle, DISABLE) : inputStyle;

  let textStyle = enhance(TEXTSTYLE, textOverride);
  //   inputStyle = enhance(inputStyle, errorStyleOverride);

  let iconStyle = enhance(ICON, iconStyleOverride);

  let placeholderStyle = enhance(PLACEHOLDER, placeholderStyleOverride);

  let labelStyle = enhance(LABEL, labelStyleOverride);
  const [showDownPage, setShowDownPage] = useState(false);

  const handleSelect = () => {
    setShowDownPage(showDownPage => !showDownPage);
  };

  return (
    <>
      <View>
        {label && (
          <Text variant={'fieldLabel'} style={labelStyle}>
            {label}
            {required && label && (
              <Text variant={'fieldError'} style={{color: color.palette.red}}>
                *
              </Text>
            )}
          </Text>
        )}
        <Pressable
          style={[inputStyle, styles.container]}
          onPress={() => {
            if (!disable) {
              handleSelect();
            }
          }}>
          <Text
            numberOfLines={1}
            style={
              value === null || value === '' || value === '/'
                ? placeholderStyle
                : textStyle
            }>
            {value === null || value === '' || value === '/'
              ? placeholder
              : value}
          </Text>

          <Image
            source={require('../../assets/icon/downArrow2.png')}
            style={iconStyle}
            resizeMode={'contain'}
          />
        </Pressable>
        {showDownPage ? (
          <Modal
            transparent={true}
            visible={showDownPage}
            animationType="fade"
            style={{backgroundColor: 'red', alignSelf: 'center'}}>
            {!loading ? (
              <Pressable
                onPress={() => {
                  setShowDownPage(false);
                }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                {options?.length ? (
                  <View
                    style={[
                      styles.dropDownView,
                      styleOverride,
                      {
                        marginTop: Platform.OS === 'ios' ? 30 : 0,
                        marginBottom: Platform.OS === 'ios' ? 65 : 0,
                      },
                    ]}>
                    <ScrollView>
                      {options?.map((item, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              onPress(item, index);
                              setShowDownPage(false);
                            }}
                            key={item}>
                            <Text
                              style={
                                index % 2 !== 0
                                  ? [
                                      styles.overideStyle,
                                      {backgroundColor: color.palette.white},
                                    ]
                                  : styles.overideStyle
                              }>
                              {item}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                ) : (
                  <View style={styles.dropDownView}>
                    <Text style={styles.noRecord}>No Record Found</Text>
                  </View>
                )}
              </Pressable>
            ) : (
              <View style={[styles.dropDownView]}>
                <Loader style={{marginTop: 20}} />
              </View>
            )}
          </Modal>
        ) : null}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  dropDownView: {
    width: '80%',
    backgroundColor: color.palette.white,

    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // borderRadius: 6,
    // elevation: 5,
  },
  paddingPosition: {
    position: 'absolute',
    top: 75,
    zIndex: 2,
  },
  overideStyle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: color.palette.dimSkyBlue,
  },
  noRecord: {
    textAlign: 'center',
    marginVertical: 20,
    color: color.palette.red,
    fontSize: 16,
    fontFamily: typography.secondary,
  },
});
