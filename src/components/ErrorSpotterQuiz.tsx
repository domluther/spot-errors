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
import { cn } from "@/lib/utils";

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
		new Set(CATEGORIES.filter((c) => c.level === 1).map((c) => c.id)), // Only level 1 categories selected by default
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

	// Helper function to encode code for ERL IDE URL
	const encodeForERL = useCallback((code: string): string => {
		return code
			.replace(/\\/g, "%5C") // Convert backslashes to %5C
			.replace(/"/g, "%5C%22") // Convert double quotes to \\" -> %5C%22
			.replace(/'/g, "%27") // Convert single quotes to %27
			.replace(/\?/g, "%3F") // Convert question marks to %3F
			.replace(/=/g, "%3D") // Convert equals signs to %3D
			.replace(/\+/g, "%2B") // Convert + operators to %2B
			.replace(/\n/g, "%5Cn") // Convert newlines to %5Cn
			.replace(/ /g, "+") // Convert spaces to +
			.replace(/\(/g, "%28") // Convert ( to %28
			.replace(/\)/g, "%29"); // Convert ) to %29
	}, []);

	// Generate ERL IDE URL
	const generateERLURL = useCallback(
		(code: string): string => {
			const encodedCode = encodeForERL(code);
			return `https://www.examreferencelanguage.co.uk/index.php?code=%5B%7B%22name%22%3A%22code%22%2C%22content%22%3A%22${encodedCode}%22%7D%5D`;
		},
		[encodeForERL],
	);

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
				<div key="line" className="p-3 mb-2 rounded bg-feedback-success-bg/50">
					<span className="mr-2">✓</span>
					<strong>Line Number:</strong> Correct! Line {answer.lineNumber}{" "}
					contains the error.
				</div>,
			);
		} else {
			feedbackItems.push(
				<div key="line" className="p-3 mb-2 rounded bg-feedback-error-bg/50">
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
				<div key="type" className="p-3 mb-2 rounded bg-feedback-success-bg/50">
					<span className="mr-2">✓</span>
					<strong>Error Type:</strong> Correct! This is a {typeDesc}.
				</div>,
			);
		} else if (errorType) {
			const correctType = answer.errorType === "syntax" ? "syntax" : "logic";
			feedbackItems.push(
				<div key="type" className="p-3 mb-2 rounded bg-feedback-error-bg/50">
					<span className="mr-2">✗</span>
					<strong>Error Type:</strong> Incorrect. This is a {correctType} error,
					not a {normalizedUserType || "different type of"} error.
				</div>,
			);
		} else {
			feedbackItems.push(
				<div key="type" className="p-3 mb-2 rounded bg-feedback-error-bg/50">
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
				<div
					key="correction"
					className="p-3 mb-2 rounded bg-feedback-success-bg/50"
				>
					<span className="mr-2">✓</span>
					<strong>Correction:</strong> Perfect! You correctly fixed the error.{" "}
					{answer.explanation}
				</div>,
			);
		} else {
			const exampleCorrection = answer.corrections[0];
			feedbackItems.push(
				<div
					key="correction"
					className="p-3 mb-2 rounded bg-feedback-error-bg/50"
				>
					<span className="mr-2">✗</span>
					<strong>Correction:</strong> Incorrect. A correct answer would be:{" "}
					<code className="px-2 py-1 rounded bg-code-display-bg">
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
		if (score === 3)
			return "bg-feedback-success-bg border-feedback-success-text text-feedback-success-text";
		if (score >= 1)
			return "bg-[oklch(0.977_0.051_84.429)] border-[oklch(0.706_0.188_84.429)] text-[oklch(0.437_0.158_84.429)]"; // yellow tones
		return "bg-feedback-error-bg border-feedback-error-text text-feedback-error-text";
	};

	return (
		<div className="max-w-4xl mx-auto">
			{/* Stats Display */}
			<Card className="p-4 border-l-4 border-stats-card-border bg-stats-card-bg">
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					<div className="text-center">
						<div className="text-2xl font-bold text-stats-points">{points}</div>
						<div className="text-sm text-stats-label">Points</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-stats-streak">
							{currentStreak}
						</div>
						<div className="text-sm text-stats-label">Current Streak</div>
					</div>
					<div className="text-center">
						<div
							className={cn(
								"text-2xl font-bold",
								accuracy >= 80
									? "text-stats-accuracy-high"
									: accuracy >= 60
										? "text-stats-record"
										: "text-stats-accuracy-low",
							)}
						>
							{accuracy}%
						</div>
						<div className="text-sm text-stats-label">Accuracy</div>
					</div>
				</div>
			</Card>{" "}
			{/* Category Filter - Collapsible */}
			<Card className="py-4 my-6">
				<details className="group">
					<summary className="px-6 pb-4 list-none cursor-pointer transition-colors hover:bg-muted/50">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="mb-1 text-lg">
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
								className="w-5 h-5 transition-transform text-muted-foreground group-open:rotate-180"
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
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
							{CATEGORIES.map((category) => (
								<div key={category.id} className="flex items-center space-x-2">
									<Checkbox
										id={category.id}
										checked={selectedCategories.has(category.id)}
										onCheckedChange={() => toggleCategory(category.id)}
									/>
									<label
										htmlFor={category.id}
										className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{category.label}
									</label>
								</div>
							))}
						</div>
						{selectedCategories.size === 0 && (
							<p className="mt-4 text-sm text-[oklch(0.706_0.188_84.429)] bg-[oklch(0.977_0.051_84.429)] border border-[oklch(0.828_0.189_84.429)] rounded p-3">
								⚠️ No categories selected. All questions will be shown.
							</p>
						)}
					</CardContent>
				</details>
			</Card>
			{/* Question Card */}
			<Card>
				<CardHeader>
					<div className="relative p-4 border-l-4 rounded bg-question-prompt-bg border-question-prompt-bg">
						<CardTitle className="mb-2 text-xl text-question-prompt-text">
							What the program should do:
						</CardTitle>
						<CardDescription className="text-base text-question-prompt-text/80">
							{currentQuestion.description}
						</CardDescription>
						<Button
							onClick={generateQuestion}
							variant="outline"
							size="sm"
							className="absolute top-2 right-2 text-xs"
							disabled={showFeedback}
						>
							Skip
						</Button>
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Code Block */}
					<div className="relative">
						<div className="p-4 overflow-x-auto font-mono text-base border-2 rounded-lg bg-code-display-bg border-border">
							{currentQuestion.code.map((line, index) => (
								<div
									key={`line-${index}-${line.substring(0, 20)}`}
									className="flex mb-1"
								>
									<span className="text-foreground/60 dark:text-code-line-number min-w-10 text-right pr-4 border-r-2 border-border mr-4 select-none">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="whitespace-pre text-foreground dark:text-code-display-text">
										{line}
									</span>
								</div>
							))}
						</div>
						<a
							href={generateERLURL(currentQuestion.code.join("\n"))}
							target="_blank"
							rel="noopener noreferrer"
							className="absolute top-2 right-2 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-md"
						>
							See in IDE
						</a>
					</div>{" "}
					{/* Input Form */}
					<div className="p-6 rounded-lg space-y-4 bg-muted/30">
						<div>
							<label
								htmlFor={lineNumberId}
								className="block mb-2 text-sm font-semibold text-foreground"
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
								className="block mb-2 text-sm font-semibold text-foreground"
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
								className="block mb-2 text-sm font-semibold text-foreground"
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
									className="flex-1 bg-action-button-bg hover:bg-action-button-bg-hover text-action-button-text disabled:bg-action-button-disabled"
								>
									Submit Answer
								</Button>
							) : (
								<Button
									onClick={generateQuestion}
									className="flex-1 bg-action-button-bg hover:bg-action-button-bg-hover text-action-button-text"
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
							className={`p-6 rounded-lg border-2 ${getFeedbackColor()} animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none focus:ring-2 focus:ring-ring`}
						>
							<div className="flex items-baseline justify-between mb-4">
								<div className="text-2xl font-bold">Score: {score}/3</div>
								<div className="text-lg font-semibold text-stats-points">
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
													<span className="ml-2 text-sm text-muted-foreground">
														(Level {difficultyLevel} question)
													</span>
												)}
											</>
										);
									})()}
								</div>
							</div>
							{feedback}
							<div className="pt-4 mt-4 text-sm border-t border-border text-muted-foreground">
								💡 Press{" "}
								<kbd className="px-2 py-1 font-mono border rounded bg-muted border-border">
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
