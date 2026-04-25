// src/core/ShieldCore.ts

import { SafetyStateMachine } from "./safety/SafetyStateMachine";
import { GuardianController } from "./guardian/GuardianController";
import { RiskEngine } from "./risk/RiskEngine";

class ShieldCore {
  public safetyMachine = new SafetyStateMachine();

  public guardian = new GuardianController(
    this.safetyMachine,
    {
      askAreYouSafe: (urgent?: boolean) => {
        console.log("Silent prompt:", urgent ? "URGENT" : "NORMAL");
      },
    }
  );

  public riskEngine = new RiskEngine((risk) => {
    this.guardian.onRiskUpdate(risk);
  });
}

export const shieldCore = new ShieldCore();