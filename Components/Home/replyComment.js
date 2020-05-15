import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import styles from '../../Styles/Home/comment';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class ReplyComment extends Component {

    confirmDeleteReply() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Delete', onPress: () => this.onDelete() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    onDelete() {
        const { onDeleteReplyLoading, deleteReplyApi, reply, post, comment, token } = this.props;
        onDeleteReplyLoading();
        const body = {
            'postId': post._id,
            'commentId': comment._id,
            'replyId': reply._id
        }
        deleteReplyApi(body, token);
    }

    render() {
        const { reply, deleteReplyLoading, currentUser } = this.props;
        const getReplyTime = reply.createdAt.slice(0, 10);
        const timeFromNow = moment(getReplyTime, "YYYY-MM-DD").fromNow();
        const capitalName = reply.user.company.centreObj.name.slice(0, 1);
        const isUserReply = reply.user._id === currentUser._id ? true : false;
        return (
            <View style={styles.replyContainer}>
                <View style={styles.commentAuthor}>
                    <View style={styles.authorImageContainer}>
                        {reply.user.company.image ?
                            <Image source={{ uri: reply.user.company.image }} style={styles.replyAuthorImage} />
                            : <View style={styles.replyAuthorImageView}><Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text></View>
                        }
                    </View>
                    <View style={styles.authorDetailsContainer}>
                        <View>
                            <Text style={styles.authorName}>{reply.user.company.centreObj.name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                            <Icon
                                name={'history'}
                                size={ratio * 7}
                                color={'#b2b2b2'}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.commentTime}>{timeFromNow}</Text>
                        </View>
                    </View>
                    {isUserReply && <TouchableOpacity onPress={() => this.confirmDeleteReply()} style={styles.flex_row}>
                        {deleteReplyLoading ? <ActivityIndicator style={{ marginRight: 30 }} color={'#283E4A'} />
                            : <Icon
                                name={'trash'}
                                size={ratio * 10}
                                color={'#555'}
                                style={{ marginRight: 30, paddingTop: 10 }}
                            />}
                    </TouchableOpacity>}
                </View>
                <View style={styles.replyTextContainer}>
                    <Text style={styles.commentText}>{reply.reply}</Text>
                </View>
            </View>
        );
    }
}

export default ReplyComment;
