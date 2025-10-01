import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	// Redirect directly to error-spotter
	return <Navigate to="/error-spotter" />;
}
