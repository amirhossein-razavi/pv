import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthLoading from '../AuthLoading';
import Login from '../Authorization/Login';
import Register from '../Authorization/Register';
import Home from '../Home';
import AddPost from '../Home/AddPost';
import UsersProfile from '../Home/UsersProfile';
import Jobs from '../Jobs';
import AddJob from '../Jobs/AddJob';
import EditJob from '../Jobs/editJob';
import Messaging from '../Messaging';
import ChatRoom from '../Messaging/ChatRoom';
import NewMessage from '../Messaging/NewMessage';
import Profile from '../Profile';
import Settings from '../Profile/Settings';

const authNavigator = createStackNavigator({
    login: Login,
    register: Register,
})

const homeNavigator = createStackNavigator(
    {
        home: {
            screen: Home,
        },
        addPost: {
            screen: AddPost
        },
        usersProfile: {
            screen: UsersProfile
        },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#283E4A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
)


const jobsNavigator = createStackNavigator({
    jobs: {
        screen: Jobs,
        params: {
            name: 'amir'
        }
    },
    addJob: {
        screen: AddJob
    },
    editJob: {
        screen: EditJob
    },
    usersProfile: {
        screen: UsersProfile
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#283E4A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
})


// const messagingNavigator = createStackNavigator({
//     messaging: {
//         screen: Messaging,
//     },
//     chatRoom: {
//         screen: ChatRoom
//     },
//     newMessage: {
//         screen: NewMessage
//     },
//     usersProfile: {
//         screen: UsersProfile
//     },
// }, {
//     defaultNavigationOptions: {
//         headerStyle: {
//             backgroundColor: '#283E4A',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold',
//         },
//     },
// })


const profileNavigator = createStackNavigator({
    profile: {
        screen: Profile,
    },
    settings: {
        screen: Settings
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#283E4A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
})

const AppNavigator = createBottomTabNavigator({
    home: homeNavigator,
    jobs: jobsNavigator,
    // messaging: messagingNavigator,
    profile: profileNavigator,
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icon;
                let iconName;
                if (routeName === 'home') {
                    iconName = `home`;
                    iconSize = 30;
                } else if (routeName === 'jobs') {
                    iconName = `bullhorn`;
                }
                // else if (routeName === 'messaging') {
                //     iconName = `envelope`;
                // }
                else if (routeName === 'profile') {
                    iconName = `user`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            style: {
                backgroundColor: '#283E4A',
            },
            labelStyle: {
                fontSize: 15
            },
            activeTintColor: '#2196F3',
            inactiveTintColor: '#fff',
        },
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            authLoading: AuthLoading,
            app: AppNavigator,
            login: authNavigator,
        },
        {
            initialRouteName: 'authLoading',
        }
    )
);

class Navigation extends Component {

    componentDidMount() {

        //log all data in AsyncStorage

        AsyncStorage.getAllKeys().then((keyArray) => {
            AsyncStorage.multiGet(keyArray).then((keyValArray) => {
                let myStorage = {};
                for (let keyVal of keyValArray) {
                    myStorage[keyVal[0]] = keyVal[1]
                }
                console.log('CURRENT STORAGE: ', myStorage);
            })
        });
    }

    render() {
        return (
            <AppContainer />
        );
    }
}

export default Navigation;
