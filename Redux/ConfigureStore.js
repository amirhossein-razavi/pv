import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Login from './Login/reducer'
import Register from './Register/reducer'
import Home from './Home/reducer'
import Jobs from './Jobs/reducer'
import AuthLoading from './AuthLoading/reducer'
import Profile from './Profile/reducer'
import Message from './Messaging/reducer'
import UsersProfile from './UsersProfile/reducer'

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login: Login,
            register: Register,
            home: Home,
            jobs: Jobs,
            authLoading: AuthLoading,
            profile: Profile,
            message: Message,
            usersProfile: UsersProfile,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

export { ConfigureStore as default };