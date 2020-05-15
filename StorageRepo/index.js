import { AsyncStorage } from 'react-native';

export const setUser = (data) => {
    AsyncStorage.setItem('User', JSON.stringify(data));
}

export const getUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('User', (err, data) => {
            if (err) {
                console.log(err)
                return reject(err);
            } else {
                const user = JSON.parse(data)
                return resolve(user);
            }
        })
    });
}

export const setUserSettings = async (data) => {
    const userInfo = await getUser();
    userInfo.user.settings = data;
    await setUser(userInfo);
}