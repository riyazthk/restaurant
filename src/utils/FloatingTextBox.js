import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  Pressable,
} from 'react-native';
import {color, typography} from '../theme';

const FloatingTextBox = ({value, setValue, labelText}) => {
  //   const [value, setValue] = useState('');
  const moveText = useRef(new Animated.Value(0)).current;
  const [lableDesign, setLableDesign] = useState(0);

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
      setLableDesign(-15);
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 0],
    outputRange: [4, -30],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  console.log('lableDesign', lableDesign);

  return (
    <View style={[styles.container, {borderBottomWidth: 1}]}>
      <Animated.View style={[styles.animatedStyle, animStyle]}>
        <Text style={[styles.label, {marginLeft: lableDesign}]}>
          {labelText}
        </Text>
      </Animated.View>
      <TextInput
        autoCapitalize={'none'}
        style={styles.input}
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        editable={true}
        onFocus={(onFocusHandler, console.log('enter focus'))}
        onBlur={(onBlurHandler, console.log('enter onBlur'))}
        blurOnSubmit
      />
    </View>
  );
};
export default FloatingTextBox;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    // paddingTop: 5,
    paddingHorizontal: 10,
    // borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 2,
    width: '90%',
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 13,
    height: 35,
    color: color.palette.black,
  },
  label: {
    color: color.palette.placeHolderBlack,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: typography.primaryGothicA1,
  },
  animatedStyle: {
    top: 5,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
  },
});
