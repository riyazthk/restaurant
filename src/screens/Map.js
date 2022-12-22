import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Header} from '../components/Header';
import {color} from '../theme';

const star = [1, 2, 3, 4, 5];
export const Map = ({route}) => {
  const {item, latlong} = route?.params ?? {};
  const navigation = useNavigation();
  const [mapRef, updateMapRef] = useState(null);
  const [coordinates, setCoordinates] = useState([
    {
      latitude: parseFloat(latlong?.lat),
      longitude: parseFloat(latlong?.lon),
    },
    {
      latitude: 0,
      longitude: 0,
    },
  ]);
  console.log('item', item?.rating);
  const [shopMrker, setShopmarker] = useState({
    latitude: parseFloat(item?.latitude),
    longitude: parseFloat(item?.longitude),
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title="Map View" style={{height: 50}} handleBack={handleBack} />
      ),
    });
  }, [navigation]);

  const handleBack = () => {
    navigation.goBack();
  };
  const getBoundaries = () => {
    if (mapRef === null) {
      return;
    }
    mapRef
      .getMapBoundaries()
      .then(res => {
        // console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <View style={[styles.container1]}>
        <MapView
          style={styles.map1}
          ref={ref => updateMapRef(ref)}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}
          zoomE
          nabled={true}
          maxZoomLevel={20}
          showsUserLocation={true}
          followsUserLocation
          mapType="standard"
          showsCompass={true}
          onMapReady={() => getBoundaries()}>
          <>
            <Marker
              pinColor={'red'}
              coordinate={shopMrker}
              title={item?.title}
              description={item?.address}
              icon={require('../assets/icon/shop.png')}>
              <Callout tooltip onPress={() => {}} style={styles.tooltip}>
                <View style={{flexDirection: 'row'}}>
                  <Text>
                    <Image
                      source={require('../assets/icon/map-img.png')}
                      style={{height: 20, width: 20}}
                    />
                  </Text>
                  <View style={{marginLeft: 5}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.starView}>
                      {star.map((items, index) => {
                        return (
                          <Text key={index.toString()}>
                            <Image
                              key={index.toString()}
                              source={
                                items < item?.rating
                                  ? require('../assets/icon/Star-fill.png')
                                  : require('../assets/icon/Star-empty.png')
                              }
                              style={styles.star}
                            />
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </Callout>
            </Marker>
          </>
          <>
            <MapViewDirections
              origin={coordinates[0]}
              destination={shopMrker}
              apikey={''} // insert your API Key here
              strokeWidth={4}
              strokeColor={color.palette.btnColor}
            />
          </>
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map1: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  starView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  tooltip: {
    flexDirection: 'row',
    backgroundColor: color?.palette.white,
    borderWidth: 1.5,
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: color.palette.btnColor,
  },
  title: {
    marginLeft: 2,
    fontSize: 9,
    color: color?.palette.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  star: {
    height: 10,
    width: 10,
    marginRight: 5,
  },
});
