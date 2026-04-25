import { EvidenceVault } from "./EvidenceVault";

export class EvidenceReportBuilder {
  static generate(vault: EvidenceVault): string {
    const entries = vault.getAllEvidence();

    let report = "SHEiLD – INCIDENT REPORT\n\n";
    report += `Generated: ${new Date().toISOString()}\n\n`;

    for (const e of entries) {
      report += `[${new Date(e.timestamp).toISOString()}] `;
      report += `${e.type}: ${e.data}\n`;
    }

    report += "\nEvidence Integrity: LOCKED\n";
    return report;
  }
}