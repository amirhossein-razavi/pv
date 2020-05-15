import * as ActionTypes from '../ActionTypes';

const Message = (state = { users: [], messages: [], chatLoading: true, refreshing: false, sendMessageLoading: false, filteredUsers: [] }, action) => {
    switch (action.type) {
        case (ActionTypes.GETUSERS):
            const data = action.payload;
            return {
                ...state,
                users: data,
                refreshing: false
            }

        case (ActionTypes.GETMESSAGES):
            const messages = action.payload;
            return {
                ...state,
                messages,
                chatLoading: false
            }

        case (ActionTypes.ONGETMESSAGESLOADING):
            return {
                ...state,
                chatLoading: true
            }

        case (ActionTypes.SENDMESSAGE):
            const newMessages = action.payload;
            return {
                ...state,
                messages: newMessages,
                sendMessageLoading: false,
            }

        case (ActionTypes.ONSENDMESSAGELOADING):
            return {
                ...state,
                sendMessageLoading: true,
            }

        case (ActionTypes.ONSEARCH):
            const newUsers = action.payload;
            return {
                ...state,
                filteredUsers: newUsers,
            }
        case (ActionTypes.ONMESSAGINGREFRESHING):
            return {
                ...state,
                refreshing: true
            }

        default:
            return state;
    }
};

export { Message as default };