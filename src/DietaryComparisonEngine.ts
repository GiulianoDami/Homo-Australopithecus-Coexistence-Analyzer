export class DietaryComparisonEngine {
  private dietaryData: Map<string, { [key: string]: number }> = new Map();

  /**
   * Adds dietary evidence for a species
   * @param speciesName - Name of the species
   * @param dietaryComponents - Object mapping dietary components to their relative abundance
   */
  addDietaryEvidence(speciesName: string, dietaryComponents: { [key: string]: number }): void {
    this.dietaryData.set(speciesName, dietaryComponents);
  }

  /**
   * Compares dietary overlap between two species
   * @param species1 - First species name
   * @param species2 - Second species name
   * @returns Dietary similarity score between 0 and 1
   */
  compareDietaryOverlap(species1: string, species2: string): number {
    const diet1 = this.dietaryData.get(species1);
    const diet2 = this.dietaryData.get(species2);

    if (!diet1 || !diet2) {
      throw new Error('Species not found in dietary database');
    }

    const allComponents = new Set([...Object.keys(diet1), ...Object.keys(diet2)]);
    
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (const component of allComponents) {
      const value1 = diet1[component] || 0;
      const value2 = diet2[component] || 0;
      
      dotProduct += value1 * value2;
      magnitude1 += value1 * value1;
      magnitude2 += value2 * value2;
    }

    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }

    const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    return Math.max(0, Math.min(1, similarity)); // Ensure between 0 and 1
  }

  /**
   * Determines if two species likely competed for the same resources
   * @param species1 - First species name
   * @param species2 - Second species name
   * @param threshold - Minimum similarity score to consider competition (default 0.7)
   * @returns Boolean indicating if species likely competed
   */
  doesSpeciesCompete(species1: string, species2: string, threshold: number = 0.7): boolean {
    return this.compareDietaryOverlap(species1, species2) >= threshold;
  }

  /**
   * Gets all species in the dietary database
   * @returns Array of species names
   */
  getSpeciesList(): string[] {
    return Array.from(this.dietaryData.keys());
  }

  /**
   * Gets dietary components for a specific species
   * @param speciesName - Name of the species
   * @returns Dietary components object or null if not found
   */
  getDietaryComponents(speciesName: string): { [key: string]: number } | null {
    return this.dietaryData.get(speciesName) || null;
  }
}