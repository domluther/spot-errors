import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Custom render function that wraps components with necessary providers
 */
function customRender(ui: ReactElement, options?: RenderOptions) {
	return render(ui, { ...options });
}

// Re-export everything from testing library
export * from "@testing-library/react";
export { customRender as render };
