export function getMetaKey(): string {
	return window.navigator.userAgent.includes("Mac") ? "⌘" : "Ctrl";
}
