import * as ActionTypes from '../ActionTypes';

const AuthLoading = (state = { currentUser: {}, token: '' }, action) => {
    switch (action.type) {

        case (ActionTypes.SAVEUSER):
            const userInfo = action.payload;
            return {
                ...state,
                currentUser: userInfo.user,
                token: (userInfo.token) && userInfo.token
            }

        case (ActionTypes.SAVEUSERSETTINGS):
            const data = action.payload;
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    settings: data
                }
            }


        default:
            return state;
    }
};

export { AuthLoading as default };