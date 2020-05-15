import axios from 'axios';

import { configAPI } from '../../src/config';
import { setUser } from '../../StorageRepo';
import { loginSuccess, loginFailed } from '../../Redux/Login/ActionCreators';

const loginAPI = (apiProps) => {
    const { username, password, navigation } = apiProps;
    const clientId = 'a399599e5421e052b8eb9f458880b82895a3832939d7a7db0a3264fa82f65da5';
    const callbackUrl = `${configAPI.appAPI}/auth/callback`;

    return dispatch => {
        axios.post(
            `${configAPI.accountAPI}/api/oauth/login?clientId=${clientId}&callbackUrl=${callbackUrl}`,
            {
                username: username,
                password: password,
            },
        )

            .then((xhr) => xhr.data)
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
                dispatch(loginSuccess());
                return data;
            })
            .then(() => {
                navigation.navigate('authLoading');
            })
            .catch((err) => {
                console.log('authError', err)
                dispatch(loginFailed(err));
            });
    }
}

export default loginAPI;