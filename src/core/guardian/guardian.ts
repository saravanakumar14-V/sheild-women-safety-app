import * as Location from "expo-location";

export type GuardianState = {
  emergencyActive: boolean;
  location: {
    latitude: number;
    longitude: number;
  } | null;
};
let guardianState: GuardianState = {
  emergencyActive: false,
  location: null,
};
const state: GuardianState = {
  emergencyActive: false,
};
export async function captureLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.warn("Location permission denied");
    return;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  guardianState.location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

export function getCurrentState(): GuardianState {
  return state;
}

export async function activateEmergency() {
  guardianState.emergencyActive = true;
  await captureLocation();
}


export function deactivateEmergency() {
  state.emergencyActive = false;
}