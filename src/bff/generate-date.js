export const generateDate = new Date(Math.random() * 8_640_000_000_000_000)
	.toISOString()
	.substring(0, 16)
	.replace('T', ' ');
