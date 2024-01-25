export const subscribe = async (callback: (message: any) => void) => {
	const response = await fetch(`${window.location.href}/events`);
	const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		callback(JSON.parse(value));
	}
};
