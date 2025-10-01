/**
 * OCR J277 Error Spotter Component Library
 * Export all reusable components for easy importing
 */

// Quiz Components
export { ErrorSpotterQuiz } from "./ErrorSpotterQuiz";
// Layout Components
export { Footer } from "./Footer";
export { Header } from "./Header";
export { ModeMenu } from "./ModeMenu";
export type {
	QuizButtonProps,
	QuizButtonSize,
	QuizButtonVariant,
} from "./QuizButton";
export { QuizButton } from "./QuizButton";
// Utility Components
export { ScoreButton } from "./ScoreButton";
export { SharedLayout, useSharedLayout } from "./SharedLayout";
export { SiteLayout } from "./SiteLayout";
export { SiteNavigation } from "./SiteNavigation";
export { StatsModal } from "./StatsModal";
export { ThemeToggle } from "./theme-toggle";

/**
 * Usage Example:
 *
 * import {
 *   SiteLayout,
 *   SharedLayout,
 *   ErrorSpotterQuiz,
 *   ModeMenu,
 *   StatsModal,
 *   QuizButton,
 *   ScoreButton,
 *   Header,
 *   Footer,
 *   SiteNavigation,
 *   ThemeToggle
 * } from "@/components";
 */
