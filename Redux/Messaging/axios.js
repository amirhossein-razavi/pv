import axios from 'axios';
import { configAPI } from '../../src/config';
import { getUsers, getMessages, sendMessage, onSearch } from './ActionCreators';


export const getUsersApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/get_messages_by_auth_id/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUsers(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const getMessagesApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/get_messages_by_message_id/${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getMessages(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const sendMessageApi = (body, method, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const url = method === 'new chat' ? 'save_chat_message' : 'save_message_in_thred';
    return dispatch => {
        axios.post(`${configAPI.appAPI}/${url}`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(sendMessage(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const onSearchApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.post(`${configAPI.appAPI}/get_companys_like`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(onSearch(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}
