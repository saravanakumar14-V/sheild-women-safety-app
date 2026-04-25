export class UserConsentStore {
  private static audioConsent = false;

  static grantAudioConsent() {
    this.audioConsent = true;
  }

  static revokeAudioConsent() {
    this.audioConsent = false;
  }

  static hasAudioConsent(): boolean {
    return this.audioConsent;
  }
}