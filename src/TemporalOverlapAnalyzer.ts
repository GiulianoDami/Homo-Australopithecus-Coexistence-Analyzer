export class TemporalOverlapAnalyzer {
  /**
   * Calculates the temporal overlap between two species based on their time ranges
   * @param species1 - First species with start and end times
   * @param species2 - Second species with start and end times
   * @returns The overlap duration as a percentage of the total time period
   */
  calculateOverlap(species1: { start: number; end: number }, species2: { start: number; end: number }): number {
    // Ensure valid time ranges
    if (species1.start > species1.end || species2.start > species2.end) {
      throw new Error('Invalid time range provided');
    }

    // Calculate overlap boundaries
    const overlapStart = Math.max(species1.start, species2.start);
    const overlapEnd = Math.min(species1.end, species2.end);

    // If there's no overlap
    if (overlapStart > overlapEnd) {
      return 0;
    }

    // Calculate overlap duration
    const overlapDuration = overlapEnd - overlapStart;

    // Calculate total time period
    const totalTime = Math.max(species1.end, species2.end) - Math.min(species1.start, species2.start);

    // Return overlap as percentage
    return (overlapDuration / totalTime) * 100;
  }

  /**
   * Determines if two species potentially coexisted based on their time ranges
   * @param species1 - First species with start and end times
   * @param species2 - Second species with start and end times
   * @returns Boolean indicating if species coexisted
   */
  doesCoexist(species1: { start: number; end: number }, species2: { start: number; end: number }): boolean {
    // Check if time ranges overlap
    return !(species1.end < species2.start || species1.start > species2.end);
  }

  /**
   * Analyzes temporal overlap for multiple species
   * @param speciesList - Array of species with start and end times
   * @returns A matrix of overlap percentages between all species pairs
   */
  analyzeMultipleSpecies(speciesList: { name: string; start: number; end: number }[]): Record<string, Record<string, number>> {
    const result: Record<string, Record<string, number>> = {};
    
    // Initialize result structure
    for (const species of speciesList) {
      result[species.name] = {};
    }
    
    // Calculate overlaps for each pair
    for (let i = 0; i < speciesList.length; i++) {
      for (let j = i; j < speciesList.length; j++) {
        const species1 = speciesList[i];
        const species2 = speciesList[j];
        
        // Skip same species
        if (i === j) {
          result[species1.name][species2.name] = 100;
        } else {
          // Calculate overlap percentage
          const overlapPercentage = this.calculateOverlap(
            { start: species1.start, end: species1.end },
            { start: species2.start, end: species2.end }
          );
          
          result[species1.name][species2.name] = overlapPercentage;
          result[species2.name][species1.name] = overlapPercentage;
        }
      }
    }
    
    return result;
  }
}