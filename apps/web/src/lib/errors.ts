export const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message;
	}

	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof error.message === "string"
	) {
		return error.message;
	}

	return "操作失败，请稍后重试。";
};

export const unwrapResult = <T>(result: {
	data?: T;
	error?: { message?: string | null } | null;
}) => {
	if ("error" in result && result.error) {
		throw new Error(result.error.message ?? "操作失败，请稍后重试。");
	}

	if ("data" in result && result.data !== undefined) {
		return result.data;
	}

	throw new Error("未收到有效响应。");
};
