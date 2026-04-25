import { SMSFallback } from "./SMSFallback";

export class EmergencyDispatcher {
  private sms = new SMSFallback();

  async dispatchSOS(contact: string, message: string) {
    // Internet alerts can go here later

    // Offline-safe fallback
    this.sms.sendSOS(contact, message);
  }
}