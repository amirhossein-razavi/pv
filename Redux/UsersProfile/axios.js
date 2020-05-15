import axios from 'axios';
import { configAPI } from '../../src/config';
import { getUserDetails, getUserStats, getUserPosts } from './ActionCreators';


export const userDetailsApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/profile_company/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserDetails(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const userStatsApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/profile_stats/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserStats(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const userPostsApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/profile_posts/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserPosts(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}
