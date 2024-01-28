export const makeGridUtils = (width: number) => {
	const toIndex = (x: number, y: number) => x + y * width;
	const toCoord = (index: number) => [index % width, Math.floor(index / width)];
	return { toIndex, toCoord };
};
