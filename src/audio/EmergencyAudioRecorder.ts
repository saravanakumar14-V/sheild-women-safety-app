import { Audio } from "expo-av";
import { EvidenceVault } from "../evidence/EvidenceVault";
import { ConsentPolicy } from "../legal/ConsentPolicy";
import { UserConsentStore } from "../settings/UserConsentStore";

export class EmergencyAudioRecorder {
  private recording: Audio.Recording | null = null;

  async tryStart(countryCode: string, vault: EvidenceVault) {
    const rule = ConsentPolicy.getRuleForCountry(countryCode);

    if (rule === "DISALLOWED") return;
    if (!UserConsentStore.hasAudioConsent()) return;

    await Audio.requestPermissionsAsync();

    this.recording = new Audio.Recording();
    await this.recording.prepareToRecordAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    await this.recording.startAsync();

    vault.addEvidence({
      timestamp: Date.now(),
      type: "SYSTEM",
      data: "Emergency audio recording started",
    });
  }

  async stop(vault: EvidenceVault) {
    if (!this.recording) return;

    await this.recording.stopAndUnloadAsync();
    const uri = this.recording.getURI();

    if (uri) {
      vault.addEvidence({
        timestamp: Date.now(),
        type: "AUDIO",
        data: uri,
      });
    }

    this.recording = null;
  }
}