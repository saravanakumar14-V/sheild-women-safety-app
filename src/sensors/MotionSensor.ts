// MotionSensor.ts
// Feeds real movement data into FreezeDetector

import { Accelerometer } from "expo-sensors";
import { FreezeDetector } from "../core/guardian/FreezeDetector";

export class MotionSensor {
  private subscription: any = null;

  constructor(private readonly freezeDetector: FreezeDetector) {}

  start() {
    // Update rate: 1 reading per second (battery-safe)
    Accelerometer.setUpdateInterval(1000);

    this.subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;

      // Calculate movement magnitude
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      // Threshold filters out hand tremor / table vibration
      if (magnitude > 1.2) {
        this.freezeDetector.registerMovement();
      }
    });
  }

  stop() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }
}