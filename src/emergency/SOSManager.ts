import { EmergencyDispatcher } from "./EmergencyDispatcher";
import { EvidenceController } from "../evidence/EvidenceController";

export class SOSManager {
  private dispatcher = new EmergencyDispatcher();
  private evidence = new EvidenceController();

  async trigger(contact: string) {
    // 1. Lock and collect evidence
    this.evidence.startEmergencyEvidence();

    // 2. Send alerts
    await this.dispatcher.dispatchSOS(
      contact,
      "SHEiLD ALERT: User may be in danger. EMERGENCY state detected."
    );
  }
}