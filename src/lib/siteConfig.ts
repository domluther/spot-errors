import type { LevelInfo } from "@/lib/scoreManager";

/** Configuration interface for Error Spotter practice site */
export interface SiteConfig {
	/** Unique site identifier for score tracking */
	siteKey: string;
	/** Site title displayed in header */
	title: string;
	/** Site subtitle/description */
	subtitle: string;
	/** Site icon/emoji */
	icon: string;
	/** Scoring configuration */
	scoring: ScoringConfig;
}

export interface ScoringConfig {
	/** Custom level system (optional, falls back to duck levels) */
	customLevels?: LevelInfo[];
}

export interface Level {
	emoji: string;
	title: string;
	description: string;
	minPoints: number;
	minAccuracy: number;
}

/** OCR J277 Error Spotter site configuration */
export const SITE_CONFIG: SiteConfig = {
	siteKey: "error-spotter",
	title: "OCR J277 Error Spotter",
	subtitle: "Find and fix syntax and logic errors in code",
	icon: "🔍",
	scoring: {
		customLevels: [
			{
				emoji: "🔍",
				title: "Bug Hunter",
				description: "Just starting your debugging journey!",
				minPoints: 0,
				minAccuracy: 0,
			},
			{
				emoji: "�",
				title: "Error Finder",
				description: "Spotting those pesky bugs!",
				minPoints: 5,
				minAccuracy: 0,
			},
			{
				emoji: "�",
				title: "Code Fixer",
				description: "Not just finding bugs, but fixing them too!",
				minPoints: 12,
				minAccuracy: 60,
			},
			{
				emoji: "🛠️",
				title: "Debug Master",
				description: "Your debugging skills are impressive!",
				minPoints: 25,
				minAccuracy: 70,
			},
			{
				emoji: "🔬",
				title: "Syntax Analyzer",
				description: "Nothing escapes your keen eye!",
				minPoints: 50,
				minAccuracy: 80,
			},
			{
				emoji: "🏆",
				title: "Error Eliminator",
				description: "The ultimate debugging champion - no error stands a chance!",
				minPoints: 75,
				minAccuracy: 90,
			},
		],
	},
};
