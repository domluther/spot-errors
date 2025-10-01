/**
 * Programming Fundamentals Component Library
 * Export all reusable components for easy importing
 */

// Quiz Components
export { ErrorSpotterQuiz } from "./ErrorSpotterQuiz";
// Layout Components
export { Footer } from "./Footer";
export { Header } from "./Header";
export { ModeMenu } from "./ModeMenu";
// export { QuizComponent } from "./old_QuizComponent"; // Old component - no longer needed
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
 *   QuizComponent,
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
