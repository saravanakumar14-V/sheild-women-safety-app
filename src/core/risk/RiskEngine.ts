// RiskEngine.ts
// This file calculates a continuous risk score (0–100)
// It NEVER triggers actions directly

import { RiskFactors } from "./RiskFactors";
import { RiskState } from "./RiskState";

export class RiskEngine {
  private currentRisk: number = 0;
  private lastUpdated: number = Date.now();

  constructor(private readonly factors: RiskFactors) {}
    update(): RiskState {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastUpdated) / 1000;
    this.lastUpdated = now;
	    const signals = [
      this.factors.motionRisk(),
      this.factors.locationRisk(),
      this.factors.timeRisk(),
      this.factors.freezeRisk(),
      this.factors.contextRisk(),
    ];
	    const combinedRisk =
      signals.reduce((sum, value) => sum + value, 0) /
      signals.length;
	      const momentum = combinedRisk * elapsedSeconds * 0.6;
		      this.currentRisk += momentum;

    // Gradual decay when signals are low
    if (combinedRisk < 10) {
      this.currentRisk -= elapsedSeconds * 5;
    }

    // Clamp between 0 and 100
    this.currentRisk = Math.max(0, Math.min(100, this.currentRisk));
	    return RiskState.fromValue(this.currentRisk);
  }
}