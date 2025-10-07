export interface LevelInfo {
	emoji: string;
	title: string;
	description: string;
	minPoints: number;
	minAccuracy: number;
}

export interface ModeStats {
	attempts: number;
	correct: number;
	points: number;
	streak: number;
	recordStreak: number;
}

export interface CategoryStats {
	attempts: number;
	correct: number;
	points: number;
}
export interface OverallStats {
	accuracy: number;
	totalPoints: number;
	totalAttempts: number;
	totalCorrect: number;
	currentLevel: LevelInfo;
	progress: number;
	nextLevel: LevelInfo | null;
	streak: number;
}

export type Mode = "Error Spotter";

export type QuestionCategory =
	| "input-output"
	| "operators"
	| "variables"
	| "selection"
	| "strings"
	| "iteration-for"
	| "iteration-while"
	| "iteration-do-until"
	| "switch"
	| "arrays"
	| "subprograms"
	| "files";

export interface ScoreData {
	"Error Spotter": ModeStats;
	categoryStats?: Record<QuestionCategory, CategoryStats>;
}

const blankCategoryStats: Record<QuestionCategory, CategoryStats> = {
	"input-output": { attempts: 0, correct: 0, points: 0 },
	operators: { attempts: 0, correct: 0, points: 0 },
	variables: { attempts: 0, correct: 0, points: 0 },
	selection: { attempts: 0, correct: 0, points: 0 },
	strings: { attempts: 0, correct: 0, points: 0 },
	"iteration-for": { attempts: 0, correct: 0, points: 0 },
	"iteration-while": { attempts: 0, correct: 0, points: 0 },
	"iteration-do-until": { attempts: 0, correct: 0, points: 0 },
	switch: { attempts: 0, correct: 0, points: 0 },
	arrays: { attempts: 0, correct: 0, points: 0 },
	subprograms: { attempts: 0, correct: 0, points: 0 },
	files: { attempts: 0, correct: 0, points: 0 },
};

const blankScoreData: ScoreData = {
	"Error Spotter": {
		attempts: 0,
		correct: 0,
		points: 0,
		streak: 0,
		recordStreak: 0,
	},
	categoryStats: { ...blankCategoryStats },
};

// Difficulty multipliers for scoring
export const DIFFICULTY_MULTIPLIERS: Record<number, number> = {
	1: 1.0, // Level 1: Basic concepts
	2: 1.25, // Level 2: Intermediate
	3: 1.5, // Level 3: Advanced
	4: 1.75, // Level 4: Expert
};

/**
 * Calculate points earned based on correct answers and difficulty level
 * @param correctParts Number of correct parts (0-3)
 * @param difficultyLevel Difficulty level (1-4)
 * @returns Object with pointsEarned and pointsPossible (both rounded up)
 */
export function calculatePoints(
	correctParts: number,
	difficultyLevel: number,
): { pointsEarned: number; pointsPossible: number } {
	const multiplier = DIFFICULTY_MULTIPLIERS[difficultyLevel] || 1.0;
	return {
		pointsEarned: Math.ceil(correctParts * multiplier),
		pointsPossible: Math.ceil(3 * multiplier),
	};
}

export class ScoreManager {
	private storageKey: string;
	private scores: ScoreData = blankScoreData;
	private levels: LevelInfo[];
	private currentMode: Mode = "Error Spotter";

	// Default generic levels that can be used as fallback
	private static readonly DEFAULT_LEVELS: LevelInfo[] = [
		{
			emoji: "🥚",
			title: "Beginner",
			description: "Just getting started!",
			minPoints: 0,
			minAccuracy: 0,
		},
		{
			emoji: "🐣",
			title: "Novice",
			description: "Making progress!",
			minPoints: 5,
			minAccuracy: 0,
		},
		{
			emoji: "🐤",
			title: "Learner",
			description: "Building confidence!",
			minPoints: 12,
			minAccuracy: 60,
		},
		{
			emoji: "🦆",
			title: "Skilled",
			description: "Getting the hang of it!",
			minPoints: 25,
			minAccuracy: 70,
		},
		{
			emoji: "🦆✨",
			title: "Expert",
			description: "Impressive skills!",
			minPoints: 50,
			minAccuracy: 80,
		},
		{
			emoji: "🪿👑",
			title: "Master",
			description: "Absolute mastery achieved!",
			minPoints: 75,
			minAccuracy: 90,
		},
	];

	constructor(customLevels?: LevelInfo[]) {
		this.storageKey = `error-spotter-stats`;
		this.levels = customLevels || ScoreManager.DEFAULT_LEVELS;
		this.scores = this.loadScores();
	}

	private loadScores(): ScoreData {
		try {
			const stored = localStorage.getItem(this.storageKey);
			if (stored) {
				const loadedScores = JSON.parse(stored) as Partial<ScoreData>;
				// Merge with blank data to ensure all modes and categories exist
				const mergedScores = JSON.parse(
					JSON.stringify(blankScoreData),
				) as ScoreData;

				// Copy over existing mode data
				if (loadedScores["Error Spotter"]) {
					mergedScores["Error Spotter"] = loadedScores["Error Spotter"];
				}

				// Copy over existing category data, ensuring all categories exist
				if (loadedScores.categoryStats) {
					mergedScores.categoryStats = {
						...blankCategoryStats,
						...loadedScores.categoryStats,
					};
				}

				return mergedScores;
			}
			// Return a deep copy to avoid mutations affecting the constant
			return JSON.parse(JSON.stringify(blankScoreData));
		} catch (error) {
			console.warn("Error loading scores:", error);
			return JSON.parse(JSON.stringify(blankScoreData));
		}
	}

	private saveScores(): void {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
		} catch (error) {
			console.warn("Error saving scores:", error);
		}
	}

	setCurrentMode(mode: Mode): void {
		this.currentMode = mode;
	}

	getStreak(mode?: Mode): number {
		const modeToUse = mode || this.currentMode;
		return this.scores[modeToUse].streak;
	}

	resetStreak(mode?: Mode): void {
		const modeToUse = mode || this.currentMode;
		this.scores[modeToUse].streak = 0;
		this.saveScores();
	}

	recordScore(
		pointsEarned: number,
		pointsPossible: number,
		category?: QuestionCategory,
		mode?: Mode,
	): void {
		if (!this.scores) {
			this.scores = { ...blankScoreData };
		}

		const modeToUse = mode || this.currentMode;
		const currentStats = this.scores[modeToUse];

		// Each question is one attempt
		currentStats.attempts++;

		// Add the points earned (can be partial)
		currentStats.points += pointsEarned;

		// A question is "correct" only if fully correct (all points earned)
		const isFullyCorrect = pointsEarned === pointsPossible;

		if (isFullyCorrect) {
			currentStats.correct++;
			currentStats.streak++;
			if (currentStats.streak > currentStats.recordStreak) {
				currentStats.recordStreak = currentStats.streak;
			}
		} else {
			currentStats.streak = 0;
		}

		// Track category stats if category is provided
		if (category && this.scores.categoryStats) {
			const categoryStats = this.scores.categoryStats[category];
			categoryStats.attempts++;
			categoryStats.points += pointsEarned;
			if (isFullyCorrect) {
				categoryStats.correct++;
			}
		}

		this.saveScores();
	}

	getOverallStats(): OverallStats {
		// Calculate overall stats from mode stats only (not categoryStats)
		let totalAttempts = 0;
		let totalCorrect = 0;
		let totalPoints = 0;
		let currentModeStreak = 0;

		// Only iterate over mode keys, not all ScoreData keys
		const modeKeys: Mode[] = ["Error Spotter"];
		modeKeys.forEach((mode) => {
			const stats = this.scores[mode];
			totalAttempts += stats.attempts;
			totalCorrect += stats.correct;
			totalPoints += stats.points;
		});

		// Use current mode's streak
		currentModeStreak = this.scores[this.currentMode].streak;

		const accuracy =
			totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;

		// Find current level
		let currentLevel = this.levels[0];
		for (let i = this.levels.length - 1; i >= 0; i--) {
			const level = this.levels[i];
			if (totalPoints >= level.minPoints && accuracy >= level.minAccuracy) {
				currentLevel = level;
				break;
			}
		}

		// Find next level
		const currentLevelIndex = this.levels.indexOf(currentLevel);
		const nextLevel =
			currentLevelIndex < this.levels.length - 1
				? this.levels[currentLevelIndex + 1]
				: null;

		// Calculate progress to next level
		let progress = 100;
		if (nextLevel) {
			const pointsProgress = Math.min(
				100,
				(totalPoints / nextLevel.minPoints) * 100,
			);
			const accuracyProgress = Math.min(
				100,
				(accuracy / nextLevel.minAccuracy) * 100,
			);
			progress = Math.min(pointsProgress, accuracyProgress);
		}

		return {
			totalAttempts,
			totalCorrect,
			accuracy,
			totalPoints,
			currentLevel,
			progress,
			nextLevel,
			streak: currentModeStreak,
		};
	}

	getModeStats(mode: Mode): ModeStats {
		return this.scores[mode];
	}

	getAllModeStats(): ScoreData {
		return this.scores;
	}

	getCategoryStats(): Record<QuestionCategory, CategoryStats> {
		return this.scores.categoryStats || { ...blankCategoryStats };
	}

	getScoresByType(): Record<
		string,
		{ attempts: number; correct: number; accuracy: number }
	> {
		const typeStats: Record<
			string,
			{ attempts: number; correct: number; accuracy: number }
		> = {};

		// For the new structure, we'll return mode-based stats
		Object.entries(this.scores).forEach(([mode, stats]) => {
			const modeTitle = this.getModeTitle(mode as Mode);
			typeStats[modeTitle] = {
				attempts: stats.attempts,
				correct: stats.correct,
				accuracy:
					stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0,
			};
		});

		return typeStats;
	}

	private getModeTitle(mode: Mode): string {
		return mode; // Since we only have "Error Spotter" now
	}

	resetAllScores(): void {
		this.scores = JSON.parse(JSON.stringify(blankScoreData));
		this.saveScores();
	}

	formatStreakEmojis(streak: number): string {
		if (streak === 0) return "";

		const denominations = [
			{ value: 50, emoji: "🪿" }, // Golden Goose for 50s
			{ value: 25, emoji: "🦅" }, // Eagle for 25s
			{ value: 10, emoji: "🦢" }, // Swan for 10s
			{ value: 5, emoji: "🦆" }, // Duck for 5s
			{ value: 1, emoji: "🐤" }, // Duckling for 1s
		];

		let result = "";
		let remaining = streak;

		for (const { value, emoji } of denominations) {
			const count = Math.floor(remaining / value);
			if (count > 0) {
				result += emoji.repeat(count);
				remaining -= count * value;
			}
		}

		return result;
	}
}
