// GuardianController.ts
// Controls escalation logic based on risk + user response

import { RiskState } from "../risk/RiskState";
import { SafetyStateMachine } from "../safety/SafetyStateMachine";
import { LocationSensor } from "../../sensors/LocationSensor";
import { FreezeDetector } from "./FreezeDetector";
import { MotionSensor } from "../../sensors/MotionSensor";

export class GuardianController {
  private lastPromptTime: number | null = null;
  private awaitingUserResponse: boolean = false;
  private freezeDetector = new FreezeDetector();
  private motionSensor = new MotionSensor(this.freezeDetector);

  constructor(
    private readonly safetyMachine: SafetyStateMachine,
    private readonly silentPrompt: SilentPrompt
  ) {setTimeout(() => {
  this.safetyMachine.setThreat();
}, 3000);}

  onRiskUpdate(riskState: RiskState) {
    switch (riskState.level) {
      case "LOW":
        this.handleLowRisk();
        break;

      case "MEDIUM":
        this.handleMediumRisk();
        break;

      case "HIGH":
        this.handleHighRisk();
        break;

      case "CRITICAL":
        this.handleCriticalRisk();
        break;
    }
  }

  private handleLowRisk() {
  this.awaitingUserResponse = false;
  this.lastPromptTime = null;

  this.motionSensor.stop();
  this.freezeDetector.reset();

  this.safetyMachine.setSafe();
}

  private handleMediumRisk() {
  const now = Date.now();

  // Start motion tracking when risk rises
  this.motionSensor.start();

  if (this.awaitingUserResponse) return;

  if (!this.lastPromptTime || now - this.lastPromptTime > 60000) {
    this.silentPrompt.askAreYouSafe();
    this.awaitingUserResponse = true;
    this.lastPromptTime = now;
    this.safetyMachine.setChecking();
    }
  }

  private handleHighRisk() {
    if (!this.awaitingUserResponse) {
      this.silentPrompt.askAreYouSafe(true);
      this.awaitingUserResponse = true;
      this.safetyMachine.setThreat();
      return;
    }

    // Already prompted but user not responding
    if (this.freezeDetector.isFrozen(30_000)) {
      this.handleCriticalRisk();
    }
  }

  private async handleCriticalRisk() {
    if (!this.awaitingUserResponse) return;

    const location = await LocationSensor.getLastSafeLocation();

    this.safetyMachine.triggerEmergency(
      location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: location.timestamp,
          }
        : undefined
    );
  }

  onUserConfirmedSafe() {
    this.awaitingUserResponse = false;
    this.lastPromptTime = null;
    this.freezeDetector.reset();
    this.safetyMachine.setSafe();
  }

  getCurrentState() {
    return this.safetyMachine.getCurrentState();
  }
}

export interface SilentPrompt {
  askAreYouSafe(urgent?: boolean): void;
}