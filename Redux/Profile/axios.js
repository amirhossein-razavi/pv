import axios from 'axios';
import { configAPI } from '../../src/config';
import { setUserSettings } from '../../StorageRepo';
import { postsApi } from '../Home/axios';
import { getUsersApi } from '../Messaging/axios';
import { saveUserSettings } from '../../Redux/AuthLoading/ActionCreators';
import { getUserDetails, getUserSettings, saveSettingsSuccessfull } from '../../Redux/Profile/ActionCreators';


export const userDetailsApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/profile_stats/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserDetails(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const getSettingsApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/settings/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserSettings(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const saveSettingsApi = (body, token, navigation) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.settings.user_id;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/settings`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(saveUserSettings(data));
                dispatch(saveSettingsSuccessfull());
                dispatch(postsApi(token, navigation));
                setUserSettings(data);
                dispatch(getUsersApi(id, token));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}
