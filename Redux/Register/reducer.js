import * as ActionTypes from '../ActionTypes';
import { Alert } from 'react-native';

const Register = (state = { firstname: '', lastname: '', email: '', password: '', loading: false, signUPButtonClicked: false }, action) => {
    switch (action.type) {
        case (ActionTypes.ONREGISTERCHANGE):
            const { prop, value } = action.payload;
            return {
                ...state,
                [prop]: value
            }

        case (ActionTypes.ONREGISTERLOADING):

            return {
                ...state,
                loading: true,
                signInButtonClicked: true,
            }

        case (ActionTypes.REGISTERSUCCESS):
            return {
                ...state,
                loading: false,
                signInButtonClicked: false,
            }

        case (ActionTypes.REGISTERFAILED):
            const error = action.payload;
            Alert.alert(error.message);
            return {
                ...state,
                loading: false,
                signInButtonClicked: false,
            }

        default:
            return state;
    }
};

export { Register as default };