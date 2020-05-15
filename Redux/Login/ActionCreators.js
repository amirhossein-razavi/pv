import * as ActionTypes from '../ActionTypes';

export const onChange = (prop, value) => ({
    type: ActionTypes.ONLOGINCHANGE,
    payload: { prop, value }
});

export const onLoading = () => ({
    type: ActionTypes.ONLOGINLOADING,
});

export const loginSuccess = () => ({
    type: ActionTypes.LOGINSUCCESS,
});

export const loginFailed = () => ({
    type: ActionTypes.LOGINFAILED,
});

