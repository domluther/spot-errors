# OCR ERL Error Spotter 🔍

An interactive web application for practicing error spotting in OCR Exam Reference Language (ERL) code. Designed specifically for GCSE Computer Science students studying for the OCR J277 qualification.

## Overview

This quiz application helps students develop their debugging skills by identifying and correcting syntax and logic errors in code snippets. Students must identify the line number, error type (syntax or logic), and provide a correction for each error.

## Features

- **32 Curated Questions** - Real-world code examples with common syntax and logic errors
- **Partial Credit Scoring** - Earn 1-3 points per question based on correctness
- **Progress Tracking** - Monitor your score, accuracy, and streak
- **Level Progression System** - Progress from Bug Hunter 🔍 to Error Eliminator 🏆
- **Keyboard Navigation** - Full keyboard support with Enter key navigation
- **Local Storage** - Your progress is saved automatically in your browser
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling
- **TanStack Router** - Type-safe routing
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Biome** - Fast linting and formatting
- **Vitest** - Unit testing framework

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/domluther/spot-errors.git
cd spot-errors

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Type check
pnpm type-check

# Run tests
pnpm test

# Build
pnpm build

# Preview production build
pnpm preview
```

## Usage

1. **Read the question** - Understand what the code is supposed to do
2. **Examine the code** - Look for syntax or logic errors
3. **Fill in your answer:**
   - Line number where the error occurs
   - Error type: "syntax" or "logic"
   - Correction: How to fix the error
4. **Submit** - Press Enter or click Submit
5. **Review feedback** - See which parts you got correct
6. **Continue** - Press Enter to move to the next question

### Scoring

- **1 point** - Correct line number
- **1 point** - Correct error type
- **1 point** - Correct correction
- **Total: 3 points per question**

### Progression Levels

| Level | Emoji | Requirements |
|-------|-------|--------------|
| Bug Hunter | 🔍 | Starting level |
| Error Finder | 🐛 | 5+ points |
| Code Fixer | 🔧 | 12+ points, 60% accuracy |
| Debug Master | 🛠️ | 25+ points, 70% accuracy |
| Syntax Analyzer | 🔬 | 50+ points, 80% accuracy |
| Error Eliminator | 🏆 | 75+ points, 90% accuracy |

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm test:ui` - Run tests with UI
- `pnpm type-check` - Check TypeScript types

### Project Structure

```
spot-errors/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ErrorSpotterQuiz.tsx
│   ├── routes/           # TanStack Router routes
│   ├── lib/              # Utilities and data
│   │   ├── questionData.ts    # Question bank
│   │   ├── scoreManager.ts    # Score tracking
│   │   └── siteConfig.ts      # Site configuration
│   └── contexts/         # React contexts
└── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Designed for OCR J277 GCSE Computer Science specification
- Built with modern web technologies for optimal learning experience

## Contact

Dominic Luther - [@domluther](https://github.com/domluther)

Project Link: [https://github.com/domluther/spot-errors](https://github.com/domluther/spot-errors)
