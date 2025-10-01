import { beforeEach, describe, expect, it } from "vitest";
import { ScoreManager } from "../lib/scoreManager";

describe("ScoreManager", () => {
	let scoreManager: ScoreManager;

	beforeEach(() => {
		localStorage.clear();
		scoreManager = new ScoreManager();
	});

	describe("initialization", () => {
		it("should initialize with blank scores if no data exists", () => {
			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].attempts).toBe(0);
			expect(stats["Error Spotter"].correct).toBe(0);
			expect(stats["Error Spotter"].points).toBe(0);
			expect(stats["Error Spotter"].streak).toBe(0);
		});

		it("should load existing scores from localStorage", () => {
			const mockData = {
				"Error Spotter": {
					attempts: 10,
					correct: 8,
					points: 24,
					streak: 3,
					recordStreak: 5,
				},
			};
			localStorage.setItem("error-spotter-stats", JSON.stringify(mockData));

			const manager = new ScoreManager();
			const stats = manager.getAllModeStats();

			expect(stats["Error Spotter"].attempts).toBe(10);
			expect(stats["Error Spotter"].correct).toBe(8);
			expect(stats["Error Spotter"].points).toBe(24);
		});
	});

	describe("recordScore", () => {
		it("should record points and increment attempts", () => {
			scoreManager.recordScore(3, 3, "input-output", "Error Spotter");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].attempts).toBe(1);
			expect(stats["Error Spotter"].correct).toBe(1); // Fully correct
			expect(stats["Error Spotter"].points).toBe(3);
		});

		it("should record partial credit correctly", () => {
			scoreManager.recordScore(2, 3, "selection", "Error Spotter");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].attempts).toBe(1);
			expect(stats["Error Spotter"].correct).toBe(0); // Not fully correct
			expect(stats["Error Spotter"].points).toBe(2);
		});

		it("should increment streak on perfect score", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(3, 3, "variables", "Error Spotter");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].streak).toBe(2);
		});

		it("should reset streak on non-perfect score", () => {
			// Build up a streak first
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(3, 3, "variables", "Error Spotter");
			
			// Then record a partial score
			scoreManager.recordScore(2, 3, "selection", "Error Spotter");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].attempts).toBe(3);
			expect(stats["Error Spotter"].streak).toBe(0);
		});

		it("should update record streak when current streak exceeds it", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(3, 3, "variables", "Error Spotter");
			scoreManager.recordScore(3, 3, "selection", "Error Spotter");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].recordStreak).toBe(3);
		});

		it("should persist scores to localStorage", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");

			const savedData = localStorage.getItem("error-spotter-stats");
			expect(savedData).not.toBeNull();
			
			const parsedData = JSON.parse(savedData!);
			expect(parsedData["Error Spotter"].correct).toBe(1);
		});
	});

	describe("getStreak", () => {
		it("should return current streak for a mode", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(3, 3, "selection", "Error Spotter");

			expect(scoreManager.getStreak("Error Spotter")).toBe(2);
		});

		it("should return 0 for mode with no attempts", () => {
			expect(scoreManager.getStreak("Error Spotter")).toBe(0);
		});
	});

	describe("getOverallStats", () => {
		it("should calculate overall statistics across all modes", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(2, 3, "variables", "Error Spotter");
			scoreManager.recordScore(3, 3, "selection", "Error Spotter");
			scoreManager.recordScore(1, 3, "iteration-for", "Error Spotter");

			const overall = scoreManager.getOverallStats();
			expect(overall.totalAttempts).toBe(4);
			expect(overall.totalCorrect).toBe(2); // 2 fully correct answers (3/3)
			expect(overall.totalPoints).toBe(9); // Sum of points earned
		});

		it("should return 0 accuracy when no attempts", () => {
			const overall = scoreManager.getOverallStats();
			expect(overall.accuracy).toBe(0);
		});
	});

	describe("resetAllScores", () => {
		it("should reset all scores to initial state", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.recordScore(2, 3, "variables", "Error Spotter");

			scoreManager.resetAllScores();

			const stats = scoreManager.getAllModeStats();
			expect(stats["Error Spotter"].attempts).toBe(0);
			expect(stats["Error Spotter"].correct).toBe(0);
			expect(stats["Error Spotter"].points).toBe(0);
		});

		it("should persist reset to localStorage", () => {
			scoreManager.recordScore(3, 3, "operators", "Error Spotter");
			scoreManager.resetAllScores();

			const savedData = localStorage.getItem("error-spotter-stats");
			expect(savedData).not.toBeNull();
			
			const parsedData = JSON.parse(savedData!);
			expect(parsedData["Error Spotter"].attempts).toBe(0);
			expect(parsedData["Error Spotter"].correct).toBe(0);
			expect(parsedData["Error Spotter"].points).toBe(0);
		});
	});
});
