import {
  phase5CompatibilitySchema,
  type ContractValidationReport,
} from '@mega-header-qyou/shared';

export function validatePhase5Contract(data: unknown): ContractValidationReport {
  const result = phase5CompatibilitySchema.safeParse(data);
  if (!result.success) {
    return {
      isCompatible: false,
      versionMismatch: true,
      unsupportedFeatures: result.error.errors.map((e) => e.message),
    };
  }

  return {
    isCompatible: true,
    versionMismatch: false,
    unsupportedFeatures: [],
  };
}
