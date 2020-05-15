import * as ActionTypes from '../ActionTypes';

export const saveUser = (userInfo) => {
    return {
        type: ActionTypes.SAVEUSER,
        payload: userInfo
    }
};

export const saveUserSettings = (data) => {
    return {
        type: ActionTypes.SAVEUSERSETTINGS,
        payload: data
    }
};
