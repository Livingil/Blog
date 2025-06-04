import { ACTION_TYPE } from '../actions';

const initialApptState = {
	wasLogout: false,
};

export const appReducer = (state = initialApptState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		default:
			return state;
	}
};
