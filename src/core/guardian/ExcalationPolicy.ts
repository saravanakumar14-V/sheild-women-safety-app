import { ContextSnapshot } from "../context/ContextBuilder";

export class EscalationPolicy {
  shouldEscalateFreeze(context: ContextSnapshot): boolean {
    return (
      context.isLateNight &&
      context.isIsolated
    );
  }
}