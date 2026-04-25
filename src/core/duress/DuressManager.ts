import { SafetyStateMachine } from "../safety/SafetyStateMachine";

export class DuressManager {
  constructor(private safetyMachine: SafetyStateMachine) {}

  verifyPin(
    enteredPinHash: string,
    config: { normalPinHash: string; duressPinHash: string }
  ): "NORMAL" | "DURESS" | "INVALID" {
    if (enteredPinHash === config.normalPinHash) {
      return "NORMAL";
    }

    if (enteredPinHash === config.duressPinHash) {
      // Silent escalation
      this.safetyMachine.triggerEmergency();
      return "DURESS";
    }

    return "INVALID";
  }
}