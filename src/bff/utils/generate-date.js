export const generateDate = () =>
	new Date(Math.random() * (1000 * 365 * 24 * 60 * 60 * 1000)).toISOString().substring(0, 16).replace('T', ' ');
