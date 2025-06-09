import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'This user is not find',
			res: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return {
			error: 'Password is not correct',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	};
};
