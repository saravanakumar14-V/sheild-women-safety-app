export class FreezeDetector {
  private lastMotionTime: number | null = null;
  private freezeStartTime: number | null = null;

  // Called whenever motion is detected
  onMotionDetected(timestamp: number) {
    this.lastMotionTime = timestamp;
    this.freezeStartTime = null;
  }

  // Called periodically (every few seconds)
  checkForFreeze(currentTime: number): boolean {
    if (!this.lastMotionTime) return false;

    const timeSinceMotion = currentTime - this.lastMotionTime;

    // Freeze only if sudden immobility > 10 seconds
    if (timeSinceMotion > 10000) {
      if (!this.freezeStartTime) {
        this.freezeStartTime = currentTime;
      }

      // Confirm freeze only after persistence
      return currentTime - this.freezeStartTime > 8000;
    }

    return false;
  }

  reset() {
    this.lastMotionTime = null;
    this.freezeStartTime = null;
  }
}
// FreezeDetector.ts
// Detects prolonged immobility during elevated risk

export class FreezeDetector {
  private lastMovementTime: number = Date.now();

  // Called whenever motion is detected
  registerMovement() {
    this.lastMovementTime = Date.now();
  }

  // Check if user may be frozen
  isFrozen(thresholdMs: number): boolean {
    const now = Date.now();
    return now - this.lastMovementTime > thresholdMs;
  }

  // Reset when situation is safe again
  reset() {
    this.lastMovementTime = Date.now();
  }
}