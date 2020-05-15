import * as ActionTypes from '../ActionTypes';
import { Alert } from 'react-native';

const Login = (state = { username: '', password: '', loading: false, signInButtonClicked: false }, action) => {
    switch (action.type) {
        case (ActionTypes.ONLOGINCHANGE):
            const { prop, value } = action.payload;

            return {
                ...state,
                [prop]: value
            }

        case (ActionTypes.ONLOGINLOADING):

            return {
                ...state,
                loading: true,
                signInButtonClicked: true,
            }

        case (ActionTypes.LOGINSUCCESS):
            return {
                ...state,
                loading: false,
                signInButtonClicked: false,
            }

        case (ActionTypes.LOGINFAILED):
            Alert.alert('invalid Username or Password');
            return {
                ...state,
                loading: false,
                signInButtonClicked: false,
            }

        default:
            return state;
    }
};

export { Login as default };