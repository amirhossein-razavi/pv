import * as ActionTypes from '../ActionTypes';

export const getUserDetails = (data) => ({
    type: ActionTypes.GETUSERDETAILS,
    payload: data
});

export const getUserSettings = (data) => ({
    type: ActionTypes.GETUSERSETTINGS,
    payload: data
});

export const onChangeSettings = (prop, value) => ({
    type: ActionTypes.ONCHANGESETTINGS,
    payload: { prop, value }
});

export const onChnageJobNotifRange = (value) => ({
    type: ActionTypes.ONCHANGEJOBNOTIFRANGE,
    payload: value
});

export const saveSettingsSuccessfull = () => ({
    type: ActionTypes.SAVESETTINGSSUCCESSFULL,
});

export const userSettingsLoading = () => ({
    type: ActionTypes.USERSETTINGSLOADING,
});

export const saveSettingsLoading = () => ({
    type: ActionTypes.SAVESETTINGSLOADING,
});
