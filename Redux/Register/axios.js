import axios from 'axios';
import { setUser } from '../../StorageRepo';
import { configAPI } from '../../src/config';
import { registerSuccess, registerFailed } from '../../Redux/Register/ActionCreators';


const registerAPI = (apiProps) => {
    const { firstname, lastname, email, password, navigation } = apiProps;
    const clientId = 'a399599e5421e052b8eb9f458880b82895a3832939d7a7db0a3264fa82f65da5';
    const callbackUrl = `${configAPI.appAPI}/auth/callback`;

    return dispatch => {
        axios.post(
            `${configAPI.accountAPI}/api/oauth/register?clientId=${clientId}&callbackUrl=${callbackUrl}`,
            {
                firstName: firstname,
                lastName: lastname,
                password: password,
                email: email,
            },
        )
            .then((xhr) => {
                return xhr.data
            })
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/auth/verify/${code}`);
                }

                throw new Error(code);
            })
            .then((xhr) => xhr.data)
            .then((data) => {
                setUser(data);
                dispatch(registerSuccess(data));
                return data;
            })
            .then(() => {
                navigation.navigate('authLoading');
            })
            .catch((err) => {
                dispatch(registerFailed(err));
                console.log('error', err)
            });
    }
}

export default registerAPI;