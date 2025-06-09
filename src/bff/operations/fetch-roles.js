import { getRoles } from '../api';
import { ROLE } from '../constans';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Access denied',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
