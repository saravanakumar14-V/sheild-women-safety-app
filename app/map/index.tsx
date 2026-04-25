// app/MapScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";

// Replace with your OpenRouteService API Key
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjIwOTZlODliMjhlODQ3NDY5M2UwMjFhMGJjMjE3YmI4IiwiaCI6Im11cm11cjY0In0=";

export default function MapScreen() {
  const [origin, setOrigin] = useState({ latitude: 12.0, longitude: 79.0 });
  const [destination, setDestination] = useState({ latitude: 12.05, longitude: 79.05 });
  const [routeCoords, setRouteCoords] = useState([]);

  // Request location permission and set current location as origin
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to show your position.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setOrigin({ latitude, longitude });

      // Fetch route after getting current location
      fetchRoute({ latitude, longitude }, destination);
    })();
  }, []);

  // Fetch route from OpenRouteService
  const fetchRoute = async (from = origin, to = destination) => {
    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${from.longitude},${from.latitude}&end=${to.longitude},${to.latitude}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coords = polyline.decode(data.routes[0].geometry);
        const formatted = coords.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
        setRouteCoords(formatted);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {/* Origin Marker */}
        <Marker coordinate={origin} title="You are here" />

        {/* Destination Marker */}
        <Marker coordinate={destination} title="Destination" />

        {/* Route Polyline */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});