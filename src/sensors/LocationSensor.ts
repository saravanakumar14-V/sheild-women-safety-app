// LocationSensor.ts
// Responsible for safe, offline-capable location retrieval

import * as Location from "expo-location";

export interface SafeLocation {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
}

export class LocationSensor {
  static async getLastSafeLocation(): Promise<SafeLocation | null> {
    try {
      // Ask permission (foreground only – safest)
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return null;
      }

      // Use last known location (works offline)
      const loc = await Location.getLastKnownPositionAsync();

      if (!loc) {
        return null;
      }

      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy ?? null,
        timestamp: loc.timestamp,
      };
    } catch (error) {
      // NEVER crash in safety software
      return null;
    }
  }
}