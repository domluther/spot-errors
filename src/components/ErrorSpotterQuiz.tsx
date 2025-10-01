import type { ReactElement } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Category, ErrorSpotterQuestion } from "@/lib/questionData";
import { errorSpotterQuestions } from "@/lib/questionData";
import type { Mode, QuestionCategory, ScoreManager } from "@/lib/scoreManager";
import { calculatePoints } from "@/lib/scoreManager";

interface ErrorSpotterQuizProps {
	mode: Mode;
	onScoreUpdate: (
		pointsEarned: number,
		pointsPossible: number,
		category?: QuestionCategory,
	) => void;
	scoreManager: ScoreManager;
}

const CATEGORIES: {
	id: Category;
	label: string;
	level: number;
	multiplier: number;
}[] = [
	{ id: "input-output", label: "Input/Output", level: 1, multiplier: 1.0 },
	{ id: "operators", label: "Operators", level: 1, multiplier: 1.0 },
	{ id: "variables", label: "Variables", level: 1, multiplier: 1.0 },
	{ id: "selection", label: "Selection (If/Else)", level: 2, multiplier: 1.25 },
	{ id: "strings", label: "String methods", level: 2, multiplier: 1.25 },
	{ id: "iteration-for", label: "Iteration (For)", level: 2, multiplier: 1.25 },
	{
		id: "iteration-while",
		label: "Iteration (While)",
		level: 2,
		multiplier: 1.25,
	},
	{
		id: "iteration-do-until",
		label: "Iteration (Do-Until)",
		level: 3,
		multiplier: 1.5,
	},
	{ id: "switch", label: "Selection (Switch)", level: 3, multiplier: 1.5 },
	{ id: "arrays", label: "Arrays", level: 4, multiplier: 1.75 },
	{
		id: "subprograms",
		label: "Functions & Procedures",
		level: 4,
		multiplier: 1.75,
	},
	{ id: "files", label: "File Operations", level: 4, multiplier: 1.75 },
];

export function ErrorSpotterQuiz({
	mode,
	onScoreUpdate,
	scoreManager,
}: ErrorSpotterQuizProps) {
	const lineNumberRef = useRef<HTMLInputElement>(null);
	const feedbackRef = useRef<HTMLDivElement>(null);
	const lineNumberId = useId();
	const errorTypeId = useId();
	const correctionId = useId();
	const [currentQuestion, setCurrentQuestion] =
		useState<ErrorSpotterQuestion | null>(null);
	const [lineNumber, setLineNumber] = useState("");
	const [errorType, setErrorType] = useState("");
	const [correction, setCorrection] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedback, setFeedback] = useState<ReactElement | string>("");
	const [score, setScore] = useState(0);
	const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
		new Set(CATEGORIES.map((c) => c.id)), // All selected by default
	);

	// Get current mode stats - with fallback for undefined
	const allModeStats = scoreManager.getAllModeStats();
	const modeStats = allModeStats[mode] || {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
	};
	const currentStreak = modeStats.streak || 0;
	const accuracy =
		modeStats && modeStats.attempts > 0
			? Math.round((modeStats.correct / modeStats.attempts) * 100)
			: 0;
	const points = modeStats ? modeStats.points : 0;

	// Generate a random question
	const generateQuestion = useCallback(() => {
		// Filter questions by selected categories
		const filteredQuestions = errorSpotterQuestions.filter((q) =>
			selectedCategories.has(q.category),
		);

		// If no categories selected or no questions match, show all questions
		const questionsToUse =
			filteredQuestions.length > 0 ? filteredQuestions : errorSpotterQuestions;

		const question =
			questionsToUse[Math.floor(Math.random() * questionsToUse.length)];

		setCurrentQuestion(question);
		setLineNumber("");
		setErrorType("");
		setCorrection("");
		setShowFeedback(false);
		setFeedback("");
		setScore(0);

		// Focus the first input after state updates
		setTimeout(() => {
			if (lineNumberRef.current) {
				lineNumberRef.current.focus();
			}
		}, 100);
	}, [selectedCategories]);

	useEffect(() => {
		generateQuestion();
	}, [generateQuestion]);

	// Focus feedback section when it appears
	useEffect(() => {
		if (showFeedback && feedbackRef.current) {
			feedbackRef.current.focus();
		}
	}, [showFeedback]);

	// Check the user's answer
	const checkAnswer = useCallback(() => {
		if (!currentQuestion) return;

		const userLineNumber = parseInt(lineNumber, 10);
		const answer = currentQuestion.answer;

		let currentScore = 0;
		const feedbackItems: ReactElement[] = [];

		// Check line number
		if (userLineNumber === answer.lineNumber) {
			currentScore++;
			feedbackItems.push(
				<div key="line" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✓</span>
					<strong>Line Number:</strong> Correct! Line {answer.lineNumber}{" "}
					contains the error.
				</div>,
			);
		} else {
			feedbackItems.push(
				<div key="line" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Line Number:</strong> Incorrect. The error is on line{" "}
					{answer.lineNumber}
					{userLineNumber ? `, not line ${userLineNumber}` : ""}.
				</div>,
			);
		}

		// Check error type - normalize input to accept variations
		const normalizedUserType = errorType
			.toLowerCase()
			.trim()
			.replace(/\s+/g, " ");
		let userErrorTypeMatches = false;

		if (answer.errorType === "syntax") {
			userErrorTypeMatches =
				normalizedUserType === "syntax" ||
				normalizedUserType === "syntax error";
		} else if (answer.errorType === "logic") {
			userErrorTypeMatches =
				normalizedUserType === "logic" || normalizedUserType === "logic error";
		}

		if (userErrorTypeMatches) {
			currentScore++;
			const typeDesc =
				answer.errorType === "syntax"
					? "syntax error so wouldn't run"
					: "logic error so runs differently";
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✓</span>
					<strong>Error Type:</strong> Correct! This is a {typeDesc}.
				</div>,
			);
		} else if (errorType) {
			const correctType = answer.errorType === "syntax" ? "syntax" : "logic";
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Error Type:</strong> Incorrect. This is a {correctType} error,
					not a {normalizedUserType || "different type of"} error.
				</div>,
			);
		} else {
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Error Type:</strong> Please enter an error type (syntax or
					logic).
				</div>,
			);
		}

		// Check correction
		const normalizedUser = correction
			.replace(/\s+/g, " ")
			.trim()
			.replace(/'/g, '"');
		let correctionCorrect = false;

		for (const correctAnswer of answer.corrections) {
			const normalizedCorrect = correctAnswer
				.replace(/\s+/g, " ")
				.trim()
				.replace(/'/g, '"');
			if (normalizedUser === normalizedCorrect) {
				correctionCorrect = true;
				break;
			}
		}

		if (correctionCorrect) {
			currentScore++;
			feedbackItems.push(
				<div key="correction" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✓</span>
					<strong>Correction:</strong> Perfect! You correctly fixed the error.{" "}
					{answer.explanation}
				</div>,
			);
		} else {
			const exampleCorrection = answer.corrections[0];
			feedbackItems.push(
				<div key="correction" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Correction:</strong> Incorrect. A correct answer would be:{" "}
					<code className="bg-gray-200 px-2 py-1 rounded">
						{exampleCorrection}
					</code>
					<br />
					{answer.explanation && <em>{answer.explanation}</em>}
				</div>,
			);
		}

		setScore(currentScore);
		setFeedback(<div className="space-y-2">{feedbackItems}</div>);
		setShowFeedback(true);

		// Calculate points based on category difficulty level
		const categoryInfo = CATEGORIES.find(
			(c) => c.id === currentQuestion.category,
		);
		const difficultyLevel = categoryInfo?.level || 1;
		const { pointsEarned, pointsPossible } = calculatePoints(
			currentScore,
			difficultyLevel,
		);

		// Record the score once per question
		onScoreUpdate(pointsEarned, pointsPossible, currentQuestion.category);
	}, [currentQuestion, lineNumber, errorType, correction, onScoreUpdate]);

	// Handle "Enter" key in inputs - different behavior based on context
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (showFeedback) {
				// If showing feedback, Enter moves to next question
				generateQuestion();
			} else if (lineNumber && errorType && correction) {
				// If all fields filled, Enter submits
				checkAnswer();
			}
		}
	};

	// Toggle category selection
	const toggleCategory = (categoryId: Category) => {
		setSelectedCategories((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(categoryId)) {
				newSet.delete(categoryId);
			} else {
				newSet.add(categoryId);
			}
			return newSet;
		});
	};

	if (!currentQuestion) {
		return (
			<div className="text-center">
				<p>Loading question...</p>
			</div>
		);
	}

	const getFeedbackColor = () => {
		if (score === 3) return "bg-green-100 border-green-300 text-green-900";
		if (score >= 1) return "bg-yellow-100 border-yellow-300 text-yellow-900";
		return "bg-red-100 border-red-300 text-red-900";
	};

	return (
		<div className="max-w-4xl mx-auto">
			{/* Stats Display */}
			<div className="mb-6 grid grid-cols-3 gap-4 text-center">
				<Card>
					<CardHeader>
						<CardDescription>Points</CardDescription>
						<CardTitle className="text-2xl text-indigo-600">{points}</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>Streak</CardDescription>
						<CardTitle className="text-2xl text-indigo-600">
							{currentStreak}
						</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>Accuracy</CardDescription>
						<CardTitle className="text-2xl text-indigo-600">
							{accuracy}%
						</CardTitle>
					</CardHeader>
				</Card>
			</div>

			{/* Category Filter - Collapsible */}
			<Card className="mb-6 py-4">
				<details className="group">
					<summary className="cursor-pointer list-none px-6 pb-4 hover:bg-gray-50 transition-colors">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg mb-1">
									Question Categories
								</CardTitle>
								<CardDescription>
									{selectedCategories.size} of {CATEGORIES.length} categories
									selected
								</CardDescription>
							</div>
							<svg
								role="img"
								aria-label="Toggle categories"
								className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</summary>
					<CardContent className="pt-0">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{CATEGORIES.map((category) => (
								<div key={category.id} className="flex items-center space-x-2">
									<Checkbox
										id={category.id}
										checked={selectedCategories.has(category.id)}
										onCheckedChange={() => toggleCategory(category.id)}
									/>
									<label
										htmlFor={category.id}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
									>
										{category.label}
									</label>
								</div>
							))}
						</div>
						{selectedCategories.size === 0 && (
							<p className="mt-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded p-3">
								⚠️ No categories selected. All questions will be shown.
							</p>
						)}
					</CardContent>
				</details>
			</Card>

			{/* Question Card */}
			<Card>
				<CardHeader>
					<div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
						<CardTitle className="text-blue-900 mb-2">
							What the program should do:
						</CardTitle>
						<CardDescription className="text-gray-700">
							{currentQuestion.description}
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Code Block */}
					<div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 font-mono text-sm overflow-x-auto">
						{currentQuestion.code.map((line, index) => (
							<div
								key={`line-${index}-${line.substring(0, 20)}`}
								className="flex mb-1"
							>
								<span className="text-gray-500 min-w-[40px] text-right pr-4 border-r-2 border-gray-300 mr-4 select-none">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="text-gray-900 whitespace-pre">{line}</span>
							</div>
						))}
					</div>{" "}
					{/* Input Form */}
					<div className="space-y-4 bg-gray-50 p-6 rounded-lg">
						<div>
							<label
								htmlFor={lineNumberId}
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								1. Line Number with Error:
							</label>
							<Input
								ref={lineNumberRef}
								id={lineNumberId}
								type="number"
								min="1"
								max={currentQuestion.code.length}
								value={lineNumber}
								onChange={(e) => setLineNumber(e.target.value)}
								onKeyDown={handleKeyPress}
								disabled={showFeedback}
								className="w-full"
							/>
						</div>
						<div>
							<label
								htmlFor={errorTypeId}
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								2. Type of Error (type "syntax" or "logic"):
							</label>
							<Input
								id={errorTypeId}
								type="text"
								value={errorType}
								onChange={(e) => setErrorType(e.target.value)}
								onKeyDown={handleKeyPress}
								disabled={showFeedback}
								placeholder="syntax or logic"
								className="w-full"
							/>
						</div>
						<div>
							<label
								htmlFor={correctionId}
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								3. Corrected Line of Code:
							</label>
							<Input
								id={correctionId}
								type="text"
								value={correction}
								onChange={(e) => setCorrection(e.target.value)}
								onKeyDown={handleKeyPress}
								disabled={showFeedback}
								placeholder="Type the corrected line here"
								className="w-full font-mono"
							/>
						</div>{" "}
						<div className="flex gap-3">
							{!showFeedback ? (
								<Button
									onClick={checkAnswer}
									disabled={!lineNumber || !errorType || !correction}
									className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
								>
									Submit Answer
								</Button>
							) : (
								<Button
									onClick={generateQuestion}
									className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
								>
									Next Question
								</Button>
							)}
						</div>
					</div>
					{/* Feedback Display */}
					{showFeedback && (
						<section
							aria-label="Answer feedback"
							ref={feedbackRef}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									generateQuestion();
								}
							}}
							className={`p-6 rounded-lg border-2 ${getFeedbackColor()} animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none focus:ring-2 focus:ring-indigo-500`}
						>
							<div className="flex items-baseline justify-between mb-4">
								<div className="text-2xl font-bold">Score: {score}/3</div>
								<div className="text-lg font-semibold text-indigo-600">
									{(() => {
										const categoryInfo = CATEGORIES.find(
											(c) => c.id === currentQuestion.category,
										);
										const difficultyLevel = categoryInfo?.level || 1;
										const { pointsEarned } = calculatePoints(
											score,
											difficultyLevel,
										);
										return (
											<>
												+{pointsEarned} points
												{difficultyLevel > 1 && (
													<span className="ml-2 text-sm text-gray-600">
														(Level {difficultyLevel} question)
													</span>
												)}
											</>
										);
									})()}
								</div>
							</div>
							{feedback}
							<div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600">
								💡 Press{" "}
								<kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">
									Enter
								</kbd>{" "}
								to continue
							</div>
						</section>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
