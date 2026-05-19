PROJECT_NAME: Homo-Australopithecus Coexistence Analyzer

# Homo-Australopithecus Coexistence Analyzer

A TypeScript-based tool that analyzes fossil data to determine potential coexistence patterns between early hominid species, helping researchers understand the complex branching tree of human evolution.

## Description

This project addresses the challenge of interpreting fossil evidence from the Ethiopian discovery that shows early Homo and previously unknown Australopithecus species coexisted around 2.6-2.8 million years ago. The tool helps scientists analyze temporal overlap, dietary differences, and resource competition patterns between these ancient species by processing fossil dating data and morphological characteristics.

The analyzer uses evolutionary biology principles to model species coexistence scenarios and can help researchers understand how multiple hominid species might have partitioned resources or competed for survival during this critical period in human evolution.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/homo-australopithecus-analyzer.git
cd homo-australopithecus-analyzer

# Install dependencies
npm install

# Compile TypeScript
npm run build

# Run tests
npm test
```

## Usage

```typescript
import { FossilAnalyzer } from './src/FossilAnalyzer';
import { FossilRecord } from './src/types';

// Example usage with fossil data from Ethiopia discovery
const analyzer = new FossilAnalyzer();

const fossilData: FossilRecord[] = [
  {
    species: "Homo habilis",
    ageRange: { min: 2.3, max: 2.8 },
    location: "Ethiopia",
    dietaryEvidence: "Tool use",
    morphologicalFeatures: ["larger brain", "distinctive teeth"]
  },
  {
    species: "Australopithecus afarensis",
    ageRange: { min: 2.0, max: 2.6 },
    location: "Ethiopia",
    dietaryEvidence: "Fruit and leaves",
    morphologicalFeatures: ["smaller brain", "arboreal adaptations"]
  }
];

// Analyze coexistence patterns
const results = analyzer.analyzeCoexistence(fossilData);
console.log(results);

// Determine resource partitioning possibilities
const resourceAnalysis = analyzer.analyzeResourcePartitioning(fossilData);
console.log(resourceAnalysis);
```

## Features

- **Temporal Overlap Analysis**: Calculate time ranges when species may have coexisted
- **Dietary Comparison Engine**: Compare food sources and feeding strategies
- **Morphological Analysis**: Assess physical characteristics that indicate niche differentiation
- **Resource Competition Modeling**: Simulate potential competition scenarios
- **Evolutionary Tree Visualization**: Generate branching diagrams of species relationships

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

Inspired by recent fossil discoveries in Ethiopia that revolutionized our understanding of human origins and challenged traditional linear evolutionary models.