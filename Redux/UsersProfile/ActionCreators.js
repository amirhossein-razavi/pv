import * as ActionTypes from '../ActionTypes';

export const getUserDetails = (data) => ({
    type: ActionTypes.GETUSERSDETAILS,
    payload: data
});

export const getUserStats = (data) => ({
    type: ActionTypes.GETUSERSSTATS,
    payload: data
});

export const getUserPosts = (data) => ({
    type: ActionTypes.GETUSERSPOSTS,
    payload: data
});

export const getUsersLoading = () => ({
    type: ActionTypes.GETUSERSLOADING,
});
