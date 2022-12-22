import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Routes} from '../../navigation/routes';

import {color, typography} from '../../theme';
import {LogInSchema} from '../../utils/schema';

import {Button, TextField, Vertical} from '../../ui-kits';
import {Header} from '../../components/Header';

const spaceValidation = new RegExp(/^[^ ]*$/);

export const LogIn = () => {
  const navigation = useNavigation();
  const [disab, setDisab] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputRef, setInputRef] = useState(' ');

  const [appBackground, setAppBackground] = useState();
  const [showP_icon, setShowP_icon] = useState(
    require('../../assets/icon/view.png'),
  );

  const handleIcon = () => {
    if (hidePassword) {
      setHidePassword(false);
      setShowP_icon(require('../../assets/icon/hidePassword.png'));
    } else {
      setHidePassword(true);
      setShowP_icon(require('../../assets/icon/view.png'));
    }
  };

  const handleBack = useCallback(() => {}, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="title" />,
    });
  }, [navigation]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: color.palette.white}}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.palette.white,
          },
        ]}>
        <View style={styles.contentView}>
          <Text
            style={[
              styles.createAcc,
              {
                color: color.palette.black,
              },
            ]}>
            Welcome Back
          </Text>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email_id: '',
              password: '',
            }}
            onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
              //   setSubmitting(true);
              navigation.navigate(Routes.INSIDE_STACK, {
                screen: Routes.DASHBOARD,
              });
            }}
            validationSchema={LogInSchema()}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}>
            {({
              handleChange,
              values,
              isSubmitting,
              errors,
              touched,
              handleBlur,
              setErrors,
              setTouched,
              setFieldValue,
              handleSubmit,
              resetForm,
              setStatus,
              initialValues,
              ...restProps
            }) => (
              <>
                <Vertical size={20} />

                <TextField
                  value={values.email_id}
                  onChangeText={text => {
                    if (text.length > 0 && text !== ' ') {
                      setFieldValue('email_id', text);
                    } else if (text === '') {
                      setFieldValue('email_id', text);
                    }
                  }}
                  onBlur={handleBlur('email_id')}
                  errorMessage={touched.email_id && errors.email_id}
                  label={'Email Id'}
                  placeholder={'Enter the Email Id'}
                  inputStyle={styles.inputStyle}
                  onSubmitEditing={() => {
                    inputRef.focus();
                  }}
                />
                <Vertical size={20} />
                <TextField
                  value={values.password}
                  onChangeText={text => {
                    if (spaceValidation.test(text)) {
                      setFieldValue('password', text);
                    }
                    setDisab(false);
                  }}
                  onBlur={handleBlur('password')}
                  label={'Password'}
                  placeholder={'Enter the password'}
                  inputStyle={styles.inputStyle}
                  errorMessage={touched.password && errors.password}
                  icon={showP_icon}
                  iconStyle={styles.icon}
                  secureTextEntry={hidePassword}
                  onIconPress={handleIcon}
                  errorStyle={{marginTop: 10}}
                  forwardedRef={ref => {
                    setInputRef(ref);
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setDisab(true);
                    resetForm();
                    setStatus({});
                    navigation.navigate(Routes.FORGOTPASSWORD);
                  }}>
                  <View style={styles.forgotView}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: color.palette.black,
                        },
                      ]}>
                      {'Forgot Your Password'}?
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Button
                  title={'Sign In'}
                  style={styles.button}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={disab ? disab : !restProps.isValid}
                  MyColor={appBackground}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
  contentView: {
    marginHorizontal: 13,
    marginTop: 65,
  },
  createAcc: {
    fontFamily: typography.primary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.165,
    color: color.palette.black,
  },
  viewText: {
    marginTop: 19.6,
  },
  inputStyle: {
    height: 36,
    fontSize: 14,
    borderRadius: 5,
    borderColor: color.palette.textInputBorder,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  button: {
    marginTop: 42,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 30,
    marginBottom: 20,
  },
  labelStyle: {
    fontFamily: typography.primary,
    textAlign: 'left',
    color: color.palette.black,
  },
  mobileLabel: {
    fontFamily: typography.primary,
    fontSize: 14,
    marginTop: 5,
  },
  errorView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    fontFamily: typography.secondary,
    color: color.palette.red,
  },
  forgotView: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  icon: {
    height: 27,
    width: 27,
    marginTop: 33,
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  textStyle: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: typography.primaryGothicA1,
    color: color.palette.black,
  },
});
