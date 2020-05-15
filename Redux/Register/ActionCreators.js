import * as ActionTypes from '../ActionTypes';

export const onChange = (prop, value) => ({
    type: ActionTypes.ONREGISTERCHANGE,
    payload: { prop, value }
});

export const onLoading = () => ({
    type: ActionTypes.ONREGISTERLOADING,
});

export const registerSuccess = () => ({
    type: ActionTypes.REGISTERSUCCESS,
});

export const registerFailed = (error) => {
    return {
        type: ActionTypes.REGISTERFAILED,
        payload: error
    }
};

