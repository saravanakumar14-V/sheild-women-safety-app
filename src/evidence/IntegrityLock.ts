export class IntegrityLock {
  private engaged = false;

  engage() {
    this.engaged = true;
  }

  isEngaged() {
    return this.engaged;
  }
}