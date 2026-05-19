export class MorphologicalAnalyzer {
  private morphologicalFeatures: Record<string, number>;
  private speciesData: Record<string, any>;

  constructor() {
    this.morphologicalFeatures = {};
    this.speciesData = {};
  }

  /**
   * Analyze morphological features for species differentiation
   */
  analyzeMorphology(speciesName: string, features: Record<string, number>): void {
    this.speciesData[speciesName] = {
      features,
      normalizedFeatures: this.normalizeFeatures(features)
    };
  }

  /**
   * Normalize morphological features to enable comparison
   */
  private normalizeFeatures(features: Record<string, number>): Record<string, number> {
    const normalized: Record<string, number> = {};
    const values = Object.values(features);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    for (const [key, value] of Object.entries(features)) {
      normalized[key] = (value - min) / (max - min);
    }
    
    return normalized;
  }

  /**
   * Calculate morphological distance between two species
   */
  calculateDistance(speciesA: string, speciesB: string): number {
    const dataA = this.speciesData[speciesA];
    const dataB = this.speciesData[speciesB];
    
    if (!dataA || !dataB) {
      throw new Error('Species data not found');
    }
    
    const featuresA = dataA.normalizedFeatures;
    const featuresB = dataB.normalizedFeatures;
    
    let sumOfSquaredDifferences = 0;
    const allKeys = new Set([...Object.keys(featuresA), ...Object.keys(featuresB)]);
    
    for (const key of allKeys) {
      const valueA = featuresA[key] || 0;
      const valueB = featuresB[key] || 0;
      sumOfSquaredDifferences += Math.pow(valueA - valueB, 2);
    }
    
    return Math.sqrt(sumOfSquaredDifferences);
  }

  /**
   * Determine niche differentiation based on morphological distances
   */
  determineNicheDifferentiation(speciesA: string, speciesB: string): 'high' | 'medium' | 'low' {
    const distance = this.calculateDistance(speciesA, speciesB);
    
    if (distance > 0.7) {
      return 'high';
    } else if (distance > 0.3) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Get morphological similarity score
   */
  getSimilarityScore(speciesA: string, speciesB: string): number {
    const distance = this.calculateDistance(speciesA, speciesB);
    return 1 - distance;
  }
}