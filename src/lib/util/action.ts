export const action = async <T extends Record<string, (args: any) => void>, K extends keyof T>(
	action: K,
	args?: Parameters<T[K]>[0],
) => {
	await fetch(`${window.location.href}/action`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ action, args }),
	});
};
