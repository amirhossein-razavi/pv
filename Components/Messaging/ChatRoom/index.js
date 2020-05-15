import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';

import { getMessagesApi, sendMessageApi } from '../../../Redux/Messaging/axios';
import { onSendMessageLoading, onGetMessagesLoading } from '../../../Redux/Messaging/ActionCreators';
import styles from '../../../Styles/Messaging/chatRoom';

const mapStateToProps = (state) => ({
    messages: state.message.messages,
    chatLoading: state.message.chatLoading,
    sendMessageLoading: state.message.sendMessageLoading,
    currentUser: state.authLoading.currentUser,
    token: state.authLoading.token,
});

const mapDispatchToProps = (dispatch) => ({
    getMessagesApi: (id, token) => dispatch(getMessagesApi(id, token)),
    sendMessageApi: (body, method, token) => dispatch(sendMessageApi(body, method, token)),
    onGetMessagesLoading: () => dispatch(onGetMessagesLoading()),
    onSendMessageLoading: () => dispatch(onSendMessageLoading()),
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            email: this.props.navigation.getParam('email'),
            message: ''
        }
    }

    componentDidMount() {
        const { id } = this.state;
        const { getMessagesApi, token, onGetMessagesLoading } = this.props;
        onGetMessagesLoading();
        getMessagesApi(id, token)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('userName'),
        }
    }

    onSend() {
        const { messages, currentUser, sendMessageApi, token, onSendMessageLoading } = this.props;
        const { message, id, email } = this.state;
        const isNewChat = messages.message === 'OK' ? true : false;
        if (isNewChat) {
            onSendMessageLoading();
            const body = {
                'sender': currentUser._id,
                'receiver': id,
                'mailData': {
                    'to': email,
                    'from_name': currentUser.company.centreObj.name,
                    'subject': "Message",
                    'text': {
                        'message': message,
                    },
                    'sender_id': currentUser._id,
                    'receiver_id': id,
                }
            }
            const method = 'new chat';
            sendMessageApi(body, method, token);
            this.setState({ message: '' })
        } else {
            onSendMessageLoading();
            const body = {
                'to': messages.receiver_id.email,
                'from_name': currentUser.company.centreObj.name,
                'subject': "Message",
                'text': {
                    'message': message
                },
                'sender_id': currentUser._id,
                'receiver_id': messages.receiver_id._id,
                'reply_to': `${id}-${currentUser._id}-${messages.receiver_id._id}`,
                'module': "Chat",
                'module_id': id,
                'action': "other",
                'parent_message_id': "5",
                'message_type': "reply"
            }
            const method = 'reply';
            sendMessageApi(body, method, token);
            this.setState({ message: '' })
        }
    }


    render() {
        const { messages, currentUser, chatLoading, sendMessageLoading } = this.props;
        const { message, id } = this.state;
        return (
            chatLoading ? <ActivityIndicator color={'#0759AA'} style={{ marginTop: 100 }} />
                : <View style={{ flex: 1 }}>
                    {messages.message === 'OK' ?
                        <View style={{ flex: 9 }}></View>
                        : <View style={{ flex: 9 }}>
                            <ScrollView>
                                {Boolean(messages.messages.length) && messages.messages.map((message) => {
                                    const isUserMessage = message.user_id._id === currentUser._id ? true : false;
                                    const messageTime = message.createdAt.slice(11, 16);
                                    return (
                                        <View style={isUserMessage ? { flex: 1, alignItems: 'flex-end' } : { flex: 1, alignItems: "flex-start" }}>
                                            {isUserMessage ? (<View style={styles.currentUserMessage}>
                                                <Text style={styles.userMessageText}>{message.raw_content.message}</Text>
                                                <Text style={styles.userMessageTime}>{messageTime}</Text>
                                            </View>)
                                                : (<View style={styles.userMessage}>
                                                    <Text style={styles.userMessageText}>{message.raw_content.message}</Text>
                                                    <Text style={styles.userMessageTime}>{messageTime}</Text>
                                                </View>)}
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>}
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            value={message}
                            placeholder="Type Something"
                            placeholderTextColor="#999"
                            multiline={true}
                            onChangeText={(message) => this.setState({ message })}
                        />
                        {sendMessageLoading ? <ActivityIndicator color={'#0759AA'} style={{ marginRight: 10 }} />
                            : <TouchableOpacity onPress={() => this.onSend()} style={styles.sendIcon}>
                                <Icon
                                    name={'send'}
                                    size={ratio * 12}
                                    color={'#1E9AD1'}
                                />
                            </TouchableOpacity>}
                    </View>
                </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
