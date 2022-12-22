/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Routes} from '../navigation';
import {restauratnListApi} from '../services/api';
import {color, typography} from '../theme';
import Geolocation from 'react-native-geolocation-service';
import {Loader} from '../ui-kits';
import {EventsSchema, EVENTS_SCHEMA} from '../utils/LocalDbSchema';
import {Header} from '../components/Header';

const Realm = require('realm');

const star = [1, 2, 3, 4, 5];
export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [appPermission, setAppPermision] = useState();
  const [restaurantList, setRestaurantList] = useState();
  const [loading, setLoading] = useState(true);
  const [latVal, setLatVal] = useState();

  const databaseOptions = {
    path: 'realmT4.realm',
    schema: [EventsSchema],
    schemaVersion: 0,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Restaurant List"
          style={{height: 50}}
          handleBack={handleBack}
        />
      ),
    });
  }, [navigation]);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    async function requestLocationPermission() {
      requestPermission();
    }
    requestLocationPermission();
  }, [requestPermission]);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        console.log('asdasd');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setAppPermision(null);
          currentLocation();
          return true;
        } else {
          setAppPermision(granted);
          return true;
        }
      } catch (err) {
        console.log('err', err);
        console.warn('requestLocationPermission error', err.message);
        return false;
      }
    } else {
      await Geolocation.requestAuthorization('whenInUse');
      currentLocation();
    }
  }, []);

  const currentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        setLatVal({lat: latitude, lon: longitude});
        setAppPermision(null);
      },
      error => {
        setAppPermision(error.message);
      },

      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    Realm.open(databaseOptions)
      .then(realm => {
        if (!realm.objects(EVENTS_SCHEMA).length) {
          restauratnListApi()
            .then(async res => {
              setLoading(false);
              setRestaurantList(res?.data?.data);
              res?.data?.data?.map((item, index) => {
                realm.write(() => {
                  realm.create(EVENTS_SCHEMA, {
                    id: item?.id,
                    address: item?.address,
                    description: item?.description,
                    latitude: item?.latitude,
                    longitude: item?.longitude,
                    mobile: item?.mobile,
                    rating: item?.rating,
                    title: item?.title,
                    total_review: item?.total_review,
                  });
                });
              });
            })
            .catch(e => {
              setLoading(false);
              console.log('e', e);
            });
        } else {
          setLoading(false);
          const data = realm.objects(EVENTS_SCHEMA);
          setRestaurantList(data);
        }
      })
      .catch(e => {
        console.log('error', e);
      });
    setLoading(true);
  }, [dispatch]);

  const renderRestaurant = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          console.log('apppermsion', appPermission);
          if (appPermission === 'denied') {
            requestPermission();
          } else if (appPermission === 'never_ask_again') {
            requestPermission();
          } else {
            navigation.navigate(Routes.MAP, {item: item, latlong: latVal});
          }
        }}
        style={styles.listContainer}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/icon/img.png')}
            style={styles.icon}
          />
          <View style={styles.titleView}>
            <Text
              style={{
                color: color.palette.black,
                fontFamily: typography.primaryBalooThambi2,
              }}>
              {item?.title}
            </Text>
            <View style={styles.starView}>
              {star.map((items, index) => {
                return (
                  <Image
                    key={index.toString()}
                    source={
                      items < item?.rating
                        ? require('../assets/icon/Star-fill.png')
                        : require('../assets/icon/Star-empty.png')
                    }
                    style={{height: 15, width: 15, marginRight: 5}}
                  />
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <Image
            source={require('../assets/icon/map.png')}
            style={{height: 27, width: 20}}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={restaurantList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={renderRestaurant}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
  listContainer: {
    backgroundColor: color.palette.white,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },
  box: {
    backgroundColor: color.palette.btnColor,
    borderRadius: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  innerContainer: {flex: 1, flexDirection: 'row'},
  titleView: {marginLeft: 20, justifyContent: 'center', flex: 1},
  starView: {flex: 1, flexDirection: 'row', marginTop: 5},
});
