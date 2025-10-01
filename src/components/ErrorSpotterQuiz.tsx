import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { errorSpotterQuestions } from "@/lib/questionData";
import type { Mode, ScoreManager } from "@/lib/scoreManager";

interface ErrorSpotterQuizProps {
	mode: Mode;
	onScoreUpdate: (isCorrect: boolean, questionType: string) => void;
	scoreManager: ScoreManager;
}

interface ErrorSpotterQuestion {
	description: string;
	code: string[];
	answer: {
		lineNumber: number;
		errorType: "syntax" | "logic";
		corrections: string[];
		explanation?: string;
	};
}

export function ErrorSpotterQuiz({
	mode,
	onScoreUpdate,
	scoreManager,
}: ErrorSpotterQuizProps) {
	const lineNumberRef = useRef<HTMLInputElement>(null);
	const feedbackRef = useRef<HTMLDivElement>(null);
	const [currentQuestion, setCurrentQuestion] =
		useState<ErrorSpotterQuestion | null>(null);
	const [lineNumber, setLineNumber] = useState("");
	const [errorType, setErrorType] = useState("");
	const [correction, setCorrection] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedback, setFeedback] = useState<ReactElement | string>("");
	const [score, setScore] = useState(0);

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
	const points = modeStats ? modeStats.correct : 0;

	// Generate a random question
	const generateQuestion = useCallback(() => {
		const question =
			errorSpotterQuestions[
				Math.floor(Math.random() * errorSpotterQuestions.length)
			];

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
	}, []);

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

		const userLineNumber = parseInt(lineNumber);
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
				</div>
			);
		} else {
			feedbackItems.push(
				<div key="line" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Line Number:</strong> Incorrect. The error is on line{" "}
					{answer.lineNumber}
					{userLineNumber ? `, not line ${userLineNumber}` : ""}.
				</div>
			);
		}

		// Check error type - normalize input to accept variations
		const normalizedUserType = errorType.toLowerCase().trim().replace(/\s+/g, ' ');
		let userErrorTypeMatches = false;
		
		if (answer.errorType === "syntax") {
			userErrorTypeMatches = normalizedUserType === "syntax" || normalizedUserType === "syntax error";
		} else if (answer.errorType === "logic") {
			userErrorTypeMatches = normalizedUserType === "logic" || normalizedUserType === "logic error";
		}

		if (userErrorTypeMatches) {
			currentScore++;
			const typeDesc = answer.errorType === "syntax" ? "syntax error" : "logic error";
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✓</span>
					<strong>Error Type:</strong> Correct! This is a {typeDesc}.
				</div>
			);
		} else if (errorType) {
			const correctType = answer.errorType === "syntax" ? "syntax" : "logic";
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Error Type:</strong> Incorrect. This is a {correctType} error,
					not a {normalizedUserType || "different type of"} error.
				</div>
			);
		} else {
			feedbackItems.push(
				<div key="type" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Error Type:</strong> Please enter an error type (syntax or logic).
				</div>
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
				</div>
			);
		} else {
			const exampleCorrection = answer.corrections[0];
			feedbackItems.push(
				<div key="correction" className="bg-white/50 p-3 rounded mb-2">
					<span className="mr-2">✗</span>
					<strong>Correction:</strong> Incorrect. A correct answer would be:{" "}
					<code className="bg-gray-200 px-2 py-1 rounded">{exampleCorrection}</code>
					<br />
					{answer.explanation && <em>{answer.explanation}</em>}
				</div>
			);
		}

		setScore(currentScore);
		setFeedback(<div className="space-y-2">{feedbackItems}</div>);
		setShowFeedback(true);

		// Update score - now tracks each point individually
		// Award a point for each correct part
		for (let i = 0; i < currentScore; i++) {
			onScoreUpdate(true, "Error Spotter");
		}
		// Record failures for parts that were wrong
		for (let i = 0; i < (3 - currentScore); i++) {
			onScoreUpdate(false, "Error Spotter");
		}
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
				<Card className="p-4">
					<p className="text-sm text-gray-600">Points</p>
					<p className="text-2xl font-bold text-indigo-600">{points}</p>
				</Card>
				<Card className="p-4">
					<p className="text-sm text-gray-600">Streak</p>
					<p className="text-2xl font-bold text-indigo-600">{currentStreak}</p>
				</Card>
				<Card className="p-4">
					<p className="text-sm text-gray-600">Accuracy</p>
					<p className="text-2xl font-bold text-indigo-600">{accuracy}%</p>
				</Card>
			</div>

			{/* Question Card */}
			<Card className="p-6 mb-6">
				<div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
					<strong className="text-blue-900">What the program should do:</strong>
					<p className="mt-2 text-gray-700">{currentQuestion.description}</p>
				</div>

				{/* Code Block */}
				<div className="mb-6 bg-gray-50 border-2 border-gray-300 rounded-lg p-4 font-mono text-sm overflow-x-auto">
					{currentQuestion.code.map((line, index) => (
						<div key={index} className="flex mb-1">
							<span className="text-gray-500 min-w-[40px] text-right pr-4 border-r-2 border-gray-300 mr-4 select-none">
								{String(index + 1).padStart(2, "0")}
							</span>
							<span className="text-gray-900 whitespace-pre">{line}</span>
						</div>
					))}
				</div>

				{/* Input Form */}
				<div className="space-y-4 bg-gray-50 p-6 rounded-lg">
					<div>
						<label htmlFor="lineNumber" className="block text-sm font-semibold text-gray-700 mb-2">
							1. Line Number with Error:
						</label>
						<Input
							ref={lineNumberRef}
							id="lineNumber"
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
						<label htmlFor="errorType" className="block text-sm font-semibold text-gray-700 mb-2">
							2. Type of Error (type "syntax" or "logic"):
						</label>
						<Input
							id="errorType"
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
						<label htmlFor="correction" className="block text-sm font-semibold text-gray-700 mb-2">
							3. Corrected Line of Code:
						</label>
						<Input
							id="correction"
							type="text"
							value={correction}
							onChange={(e) => setCorrection(e.target.value)}
							onKeyDown={handleKeyPress}
							disabled={showFeedback}
							placeholder="Type the corrected line here"
							className="w-full font-mono"
						/>
					</div>

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
					<div
						ref={feedbackRef}
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								generateQuestion();
							}
						}}
						className={`mt-6 p-6 rounded-lg border-2 ${getFeedbackColor()} animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none focus:ring-2 focus:ring-indigo-500`}
					>
						<div className="text-2xl font-bold mb-4">Score: {score}/3</div>
						{feedback}
						<div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600">
							💡 Press <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Enter</kbd> to continue
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
