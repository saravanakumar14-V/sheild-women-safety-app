export type ConsentRule =
  | "ONE_PARTY"
  | "ALL_PARTY"
  | "DISALLOWED";

export class ConsentPolicy {
  static getRuleForCountry(countryCode: string): ConsentRule {
    switch (countryCode) {
      case "IN": // India
        return "ONE_PARTY";

      case "US": // Simplified (safe default)
        return "ALL_PARTY";

      case "DE":
      case "FR":
      case "EU":
        return "DISALLOWED";

      default:
        return "DISALLOWED";
    }
  }
}