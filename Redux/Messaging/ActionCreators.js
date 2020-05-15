import * as ActionTypes from '../ActionTypes';

export const getUsers = (data) => ({
    type: ActionTypes.GETUSERS,
    payload: data
});

export const onRefreshing = () => ({
    type: ActionTypes.ONMESSAGINGREFRESHING,
});

export const getMessages = (data) => ({
    type: ActionTypes.GETMESSAGES,
    payload: data
});

export const onGetMessagesLoading = () => ({
    type: ActionTypes.ONGETMESSAGESLOADING,
});

export const sendMessage = (data) => ({
    type: ActionTypes.SENDMESSAGE,
    payload: data
});

export const onSendMessageLoading = () => ({
    type: ActionTypes.ONSENDMESSAGELOADING,
});

export const onSearch = (data) => ({
    type: ActionTypes.ONSEARCH,
    payload: data
});
