/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {AdvContext} from '../../context/AdvProvider';

const MapAdvTab = () => {
  const [mapType, setMatType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {advogados} = useContext(AdvContext);

  useEffect(() => {
    //console.log(students);
    let m = [];
    advogados.map((s) => {
      console.log(s);
      m.push({
        key: s.uid,
        coords: {
          latitude: Number(s.latitude),
          longitude: Number(s.longitude),
        },
        title: s.nome,
        description: s.oab,
        image: require('../../assets/images/person_map_accent.png'),
      });
    });
    setMarkers(m);
  }, [advogados]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={(map) => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={(e) => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
          console.log('Coordenadas',
          'latitude= ' +
            e.nativeEvent.coordinate.latitude +
            ' longitude= ' +
            e.nativeEvent.coordinate.longitude,);
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015, //baseado na documentação
          longitudeDelta: 0.0121, //baseado na documentação
        }}>
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
              style={styles.marker}
            />
          );
        })}
      </MapView>
    </View>
  );
};
export default MapAdvTab;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 120,
    height: 120,
  },
});