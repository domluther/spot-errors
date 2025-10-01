import { createFileRoute } from "@tanstack/react-router";
import { ErrorSpotterQuiz, SharedLayout } from "@/components";

export const Route = createFileRoute("/error-spotter")({
	component: ErrorSpotterPage,
});

function ErrorSpotterPage() {
	return (
		<SharedLayout mode="Error Spotter">
			{(onScoreUpdate, scoreManager) => (
				<ErrorSpotterQuiz
					mode="Error Spotter"
					onScoreUpdate={onScoreUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
