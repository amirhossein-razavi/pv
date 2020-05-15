import React, { Component } from 'react';
import { View, RefreshControl, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../Styles/Messaging'
import { getUsersApi, getMessagesApi } from '../../Redux/Messaging/axios';
import { onRefreshing } from '../../Redux/Messaging/ActionCreators';
import UsersList from './usersList';

const mapStateToProps = (state) => ({
    users: state.message.users,
    refreshing: state.message.refreshing,
    currentUser: state.authLoading.currentUser,
    token: state.authLoading.token,
});

const mapDispatchToProps = (dispatch) => ({
    getUsersApi: (id, token) => dispatch(getUsersApi(id, token)),
    getMessagesApi: (id, token) => dispatch(getMessagesApi(id, token)),
    onRefreshing: () => dispatch(onRefreshing()),
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class Messaging extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disable: false
        }
    }

    componentDidMount() {
        const { getUsersApi, currentUser, token } = this.props
        getUsersApi(currentUser._id, token);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => {
                return (
                    <Icon
                        name={'comment-dots'}
                        size={25}
                        color={'#fff'}
                        style={{ marginRight: 15 }}
                    // onPress={() => navigation.navigate('newMessage', { navigation: navigation })}
                    />
                )
            },
            title: 'Messaging',
        }
    }

    onDisable() {
        if (this.props.currentUser.settings.privacy.filter(i => i === 'disable_messaging').length) {
            this.setState({
                disable: true,
            })
        } else {
            this.setState({
                disable: false
            })
        }
    }

    onRefresh() {
        const { onRefreshing, getUsersApi, token, currentUser } = this.props;
        onRefreshing();
        getUsersApi(currentUser._id, token)
        this.onDisable();
    }
    render() {
        const { users, navigation, getMessagesApi, token, refreshing } = this.props;
        const { disable } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <FlatList
                    data={users}
                    renderItem={({ item }) => <UsersList user={item}
                        navigation={navigation}
                        getMessagesApi={getMessagesApi}
                        token={token}
                    />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    keyExtractor={item => item._id}
                /> */}
                {disable ? <>
                    <Text style={styles.disableText}>Your messaging is disabled.</Text>
                    <Text style={styles.disableText}>Go to Settings to enable it.</Text>
                    <TouchableOpacity style={styles.settingsButton}
                        onPress={() => navigation.navigate('settings')}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </>
                    : <Text style={{ fontSize: 18 }}>Comming Soon....</Text>}
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);

