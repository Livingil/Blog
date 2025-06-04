import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constans';

const initialUserState = {
	id: null,
	session: null,
	roleId: ROLE.GUEST,
	login: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return { ...state, ...action.payload };
		}
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}
		default:
			return state;
	}
};
