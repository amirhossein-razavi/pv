import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { onSearchApi } from '../../../Redux/Messaging/axios';
import styles from '../../../Styles/Messaging';
import FilteredUsersList from '../filteredUsersList';

const mapStateToProps = (state) => ({
    filteredUsers: state.message.filteredUsers,
    currentUser: state.authLoading.currentUser,
    token: state.authLoading.token,
});

const mapDispatchToProps = (dispatch) => ({
    onSearchApi: (body, token) => dispatch(onSearchApi(body, token)),
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class NewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    static navigationOptions = {
        title: 'New Message',
    }
    onSearch(search) {
        this.setState({ message: search });
        const { onSearchApi, token } = this.props;
        const { message } = this.state;
        const body = {
            company_name: message,
        };
        onSearchApi(body, token);
    }

    render() {
        const { filteredUsers, token } = this.props;
        const { message } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#E8E8E8' }}>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            value={message}
                            placeholder="serach..."
                            placeholderTextColor="#999"
                            multiline={true}
                            onChangeText={(search) => this.onSearch(search)}
                        />
                        <Icon
                            name={'search'}
                            size={ratio * 12}
                            color={'#bbb'}
                        />
                    </View>
                </View>
                <ScrollView>
                    {filteredUsers && filteredUsers.map((user) => {
                        return (
                            <FilteredUsersList user={user}
                                navigation={this.props.navigation.getParam('navigation')}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
