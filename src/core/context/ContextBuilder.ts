export type ContextSnapshot = {
  isLateNight: boolean;
  isIsolated: boolean;
  routeDeviation: boolean;
};

export class ContextBuilder {
  build(): ContextSnapshot {
    const hour = new Date().getHours();

    return {
      isLateNight: hour < 5 || hour > 22,
      isIsolated: true, // placeholder (crowd logic later)
      routeDeviation: false, // placeholder (baseline logic later)
    };
  }
}