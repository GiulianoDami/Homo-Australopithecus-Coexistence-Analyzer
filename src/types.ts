export interface FossilRecord {
  id: string;
  species: string;
  location: string;
  dateRange: {
    earliest: number;
    latest: number;
  };
  morphologicalFeatures: Record<string, any>;
  preservationQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface CoexistenceResult {
  speciesA: string;
  speciesB: string;
  temporalOverlap: {
    percentage: number;
    startDate: number;
    endDate: number;
  };
  likelihood: 'high' | 'medium' | 'low';
  supportingEvidence: string[];
}

export interface ResourcePartitioningResult {
  species: string;
  dietaryNiche: {
    primaryFoodSources: string[];
    feedingStrategy: 'terrestrial' | 'arboreal' | 'mixed';
    dentalSpecialization: string;
  };
  habitatPreference: {
    environmentType: 'forest' | 'savanna' | 'mixed';
    elevationRange: [number, number];
  };
  competitiveIndex: number;
}