// RiskFactors.ts
// Converts sensor/context data into normalized risk values (0–100)

export class RiskFactors {
  constructor(
    private motionProvider: MotionProvider,
    private locationProvider: LocationProvider,
    private timeProvider: TimeProvider,
    private contextProvider: ContextProvider,
    private freezeProvider: FreezeProvider
  ) {}
    motionRisk(): number {
    const motion = this.motionProvider.getMotionState();

    if (!motion) return 0;

    // Sudden erratic movement or forced motion
    if (motion.isErratic && motion.speed > motion.baselineSpeed * 1.8) {
      return 70;
    }

    // Unusual running or struggle-like motion
    if (motion.speed > motion.baselineSpeed * 2.5) {
      return 85;
    }

    return 10;
  }
    locationRisk(): number {
    const location = this.locationProvider.getLocationContext();

    if (!location) return 0;

    let risk = 0;

    if (location.isIsolated) risk += 30;
    if (location.isPoorlyLit) risk += 25;
    if (location.isHighCrimeArea) risk += 40;

    return Math.min(100, risk);
  }
    timeRisk(): number {
    const hour = this.timeProvider.getHour();

    if (hour >= 22 || hour <= 4) return 40;
    if (hour >= 19 && hour < 22) return 20;

    return 5;
  }
    freezeRisk(): number {
    const freeze = this.freezeProvider.getFreezeState();

    if (!freeze) return 0;

    if (freeze.isFrozen && freeze.durationSeconds > 10) {
      return 90;
    }

    if (freeze.isFrozen && freeze.durationSeconds > 5) {
      return 60;
    }

    return 0;
  }
    contextRisk(): number {
    const context = this.contextProvider.getContext();

    if (!context) return 0;

    if (context.deviationFromBaseline > 2.5) return 70;
    if (context.deviationFromBaseline > 1.5) return 40;

    return 5;
  }
  // Provider interfaces (implemented elsewhere)

export interface MotionProvider {
  getMotionState(): {
    speed: number;
    baselineSpeed: number;
    isErratic: boolean;
  } | null;
}

export interface LocationProvider {
  getLocationContext(): {
    isIsolated: boolean;
    isPoorlyLit: boolean;
    isHighCrimeArea: boolean;
  } | null;
}

export interface TimeProvider {
  getHour(): number;
}

export interface ContextProvider {
  getContext(): {
    deviationFromBaseline: number;
  } | null;
}

export interface FreezeProvider {
  getFreezeState(): {
    isFrozen: boolean;
    durationSeconds: number;
  } | null;
}