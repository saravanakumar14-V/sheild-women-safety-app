import { EvidenceVault } from "./EvidenceVault";
import { AudioRecorder } from "./AudioRecorder";
import { IntegrityLock } from "./IntegrityLock";

export class EvidenceController {
  private vault = new EvidenceVault();
  private recorder = new AudioRecorder();
  private lock = new IntegrityLock();

  startEmergencyEvidence() {
    this.recorder.start();

    this.vault.addEvidence({
      timestamp: Date.now(),
      type: "SYSTEM",
      data: "Emergency triggered",
    });

    this.lock.engage();
    this.vault.lockVault();
  }

  getVault() {
    return this.vault;
  }
}