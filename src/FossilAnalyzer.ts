export class FossilAnalyzer {
  private fossilData: any[] = [];
  private coexistencePatterns: any[] = [];

  constructor() {}

  /**
   * Adds fossil data to the analyzer
   * @param fossil - Object containing fossil information including species, age, and location
   */
  addFossil(fossil: any): void {
    this.fossilData.push(fossil);
  }

  /**
   * Analyzes fossil data to determine coexistence patterns
   * @returns Array of coexistence patterns found
   */
  analyzeCoexistence(): any[] {
    // Group fossils by species
    const speciesMap: Map<string, any[]> = new Map();
    
    this.fossilData.forEach(fossil => {
      if (!speciesMap.has(fossil.species)) {
        speciesMap.set(fossil.species, []);
      }
      speciesMap.get(fossil.species)?.push(fossil);
    });

    // Find overlapping time periods
    const speciesList = Array.from(speciesMap.keys());
    const patterns: any[] = [];

    for (let i = 0; i < speciesList.length; i++) {
      for (let j = i + 1; j < speciesList.length; j++) {
        const speciesA = speciesList[i];
        const speciesB = speciesList[j];
        
        const fossilsA = speciesMap.get(speciesA) || [];
        const fossilsB = speciesMap.get(speciesB) || [];
        
        // Check for temporal overlap
        const minAgeA = Math.min(...fossilsA.map((f: any) => f.age));
        const maxAgeA = Math.max(...fossilsA.map((f: any) => f.age));
        const minAgeB = Math.min(...fossilsB.map((f: any) => f.age));
        const maxAgeB = Math.max(...fossilsB.map((f: any) => f.age));
        
        // If there's overlap in time periods
        if (maxAgeA >= minAgeB && maxAgeB >= minAgeA) {
          patterns.push({
            speciesA,
            speciesB,
            overlapStart: Math.max(minAgeA, minAgeB),
            overlapEnd: Math.min(maxAgeA, maxAgeB),
            locations: [...new Set([
              ...fossilsA.map((f: any) => f.location),
              ...fossilsB.map((f: any) => f.location)
            ])]
          });
        }
      }
    }

    this.coexistencePatterns = patterns;
    return patterns;
  }

  /**
   * Gets all fossil data
   * @returns Array of all fossil records
   */
  getFossilData(): any[] {
    return this.fossilData;
  }

  /**
   * Gets coexistence patterns
   * @returns Array of coexistence patterns
   */
  getCoexistencePatterns(): any[] {
    return this.coexistencePatterns;
  }

  /**
   * Clears all fossil data
   */
  clearData(): void {
    this.fossilData = [];
    this.coexistencePatterns = [];
  }
}