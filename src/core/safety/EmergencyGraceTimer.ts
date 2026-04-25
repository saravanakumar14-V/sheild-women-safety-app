export class EmergencyGraceTimer {
  private timer: NodeJS.Timeout | null = null;
  private readonly GRACE_MS = 20_000; // 20 seconds

  start(onExpire: () => void) {
    this.cancel();

    this.timer = setTimeout(() => {
      onExpire();
    }, this.GRACE_MS);
  }

  cancel() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}