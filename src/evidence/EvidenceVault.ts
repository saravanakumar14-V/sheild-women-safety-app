type EvidenceEntry = {
  timestamp: number;
  type: "AUDIO" | "LOCATION" | "SYSTEM";
  data: string;
};

export class EvidenceVault {
  private vault: EvidenceEntry[] = [];
  private locked = false;

  addEvidence(entry: EvidenceEntry) {
    if (this.locked) return;
    this.vault.push(entry);
  }

  lockVault() {
    this.locked = true;
  }

  getAllEvidence(): EvidenceEntry[] {
    return [...this.vault];
  }

  clear() {
    if (this.locked) return;
    this.vault = [];
  }
}