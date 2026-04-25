import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import Communications from 'react-native-communications';

MapboxGL.setAccessToken(null); // Required for MapLibre (OSM)

// ---------- EMERGENCY CONTACTS ----------
const EMERGENCY_CONTACTS = ['9876543210']; // Replace with your number

export default function App() {
  const [location, setLocation] = useState(null);
  const [heatPoints, setHeatPoints] = useState([]);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);

    generateHeatmap(loc.coords);
  };

  // ---------- HEATMAP GENERATOR ----------
  const generateHeatmap = (coords) => {
    const hour = new Date().getHours();

    const threatLevel =
      hour >= 20 || hour <= 5 ? 0.9 : 0.4;

    const points = [
      {
        type: 'Feature',
        properties: { intensity: threatLevel },
        geometry: {
          type: 'Point',
          coordinates: [
            coords.longitude,
            coords.latitude,
          ],
        },
      },
      {
        type: 'Feature',
        properties: { intensity: 0.7 },
        geometry: {
          type: 'Point',
          coordinates: [
            coords.longitude + 0.002,
            coords.latitude + 0.002,
          ],
        },
      },
      {
        type: 'Feature',
        properties: { intensity: 0.2 },
        geometry: {
          type: 'Point',
          coordinates: [
            coords.longitude - 0.002,
            coords.latitude - 0.002,
          ],
        },
      },
    ];

    setHeatPoints(points);
  };

  // ---------- EMERGENCY SMS ----------
  const sendEmergencySMS = async () => {
    if (!location) return;

    const message = `
🚨 EMERGENCY ALERT 🚨
I need help immediately!

Live Location:
https://www.google.com/maps?q=${location.latitude},${location.longitude}
`;

    Communications.text(
      EMERGENCY_CONTACTS,
      message
    );
  };

  if (!location) return null;

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={[
            location.longitude,
            location.latitude,
          ]}
        />

        {/* USER LOCATION */}
        <MapboxGL.PointAnnotation
          id="userLocation"
          coordinate={[
            location.longitude,
            location.latitude,
          ]}
        />

        {/* HEATMAP */}
        <MapboxGL.ShapeSource
          id="heatSource"
          shape={{
            type: 'FeatureCollection',
            features: heatPoints,
          }}
        >
          <MapboxGL.HeatmapLayer
            id="heatLayer"
            style={{
              heatmapWeight: ['get', 'intensity'],
              heatmapIntensity: 1,
              heatmapRadius: 40,
              heatmapColor: [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'green',
                0.3,
                'yellow',
                0.6,
                'orange',
                1,
                'red',
              ],
            }}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>

      {/* EMERGENCY BUTTON */}
      <View style={styles.button}>
        <Button
          title="🚨 EMERGENCY"
          color="red"
          onPress={sendEmergencySMS}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '70%',
  },
});