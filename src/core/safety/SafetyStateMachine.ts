// SafetyStateMachine.ts
// Holds and manages the current safety state of the user
export interface EmergencyLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
}
export type SafetyState =
  | "SAFE"
  | "CHECKING"
  | "THREAT"
  | "EMERGENCY";

export class SafetyStateMachine {
  private currentState: SafetyState = "SAFE";
  private emergencyLocation: EmergencyLocation | null = null;

  // ---- State setters ----

  setSafe() {
    this.currentState = "SAFE";
  }

  setChecking() {
    this.currentState = "CHECKING";
  }

  setThreat() {
    this.currentState = "THREAT";
  }

  triggerEmergency(location?: EmergencyLocation) {
  this.currentState = "EMERGENCY";

  if (location) {
    this.emergencyLocation = location;
  }
  if (state === "EMERGENCY") {
  audioRecorder.tryStart(countryCode, evidenceVault);
}
}

  // ---- State reader (THIS WAS MISSING) ----

  getCurrentState(): SafetyState {
    return this.currentState;
  }
  getEmergencyLocation(): EmergencyLocation | null {
  return this.emergencyLocation;
}
}