import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import ReplyComment from './replyComment'
import styles from '../../Styles/Home/comment';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class CommentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showReplies: false,
            replyComment: '',
        }
    }
    confirmDeleteComment() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Delete', onPress: () => this.deleteComment() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deleteComment() {
        const { job, comment, currentUser, token, deleteJobCommentApi, onDeleteJobCommentLoading } = this.props;
        onDeleteJobCommentLoading();
        const body = {
            'event': 'deleted',
            'jobId': job._id,
            'commentId': comment._id,
            'authauthUserIdUserId': currentUser._id
        }
        deleteJobCommentApi(body, token);
    }

    onReplyComment() {
        const { jobReplyCommentApi, job, comment, currentUser, token, onJobReplyCommentLoading } = this.props;
        const { replyComment } = this.state;
        const body = {
            'jobId': job._id,
            'commentId': comment._id,
            'reply': replyComment,
            'replyer': currentUser._id
        }
        if (replyComment.length) {
            onJobReplyCommentLoading();
            jobReplyCommentApi(body, token);
        } else Alert.alert('Write Something');

        this.setState({ replyComment: '' })
    }

    render() {
        const { job, token, comment, currentUser, replyCommentLoading, deleteJobCommentLoading, replyCommentPending, onDeleteJobReplyLoading, deleteJobReplyApi, deleteJobReplyLoading } = this.props;
        const { showReplies, replyComment } = this.state;
        const getPostTime = comment.createdAt.slice(0, 10);
        const timeFromNow = moment(getPostTime, "YYYY-MM-DD").fromNow();
        const repliesCounter = comment.replys.length;
        const capitalName = comment.user.company.centreObj.name.slice(0, 1);
        const isUserComment = currentUser._id === comment.user._id;
        return (
            <View style={styles.commentContainer}>
                <View style={styles.commentAuthor}>
                    <View style={styles.authorImageContainer}>
                        {comment.user.company.centreObj.personalInfo.photoUrl ?
                            <Image source={{ uri: comment.user.company.centreObj.personalInfo.photoUrl }} style={styles.authorImage} />
                            : <View style={styles.authorImageView}><Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text></View>
                        }
                    </View>
                    <View style={styles.authorDetailsContainer}>
                        <View>
                            <Text style={styles.authorName}>{comment.user.company.centreObj.name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                            <Icon
                                name={'history'}
                                size={ratio * 8}
                                color={'#b2b2b2'}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.commentTime}>{timeFromNow}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.commentTextContainer}>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                </View>
                <View style={styles.commentOptions}>
                    {replyCommentPending ? <ActivityIndicator color={'#283E4A'} />
                        : <>
                            <TouchableOpacity onPress={() => this.setState(state => ({ showReplies: !state.showReplies }))}>
                                <Text style={{ marginRight: 25, paddingTop: 10, color: '#515151' }}>{repliesCounter} replies</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState(state => ({ showReplies: !state.showReplies }))} style={styles.flex_row}>
                                <Icon
                                    name={'comment'}
                                    size={ratio * 8}
                                    color={'#555'}
                                    style={{ marginRight: 5, paddingTop: 10 }}
                                />
                                <Text style={{ paddingTop: 10, marginRight: 25 }}>reply</Text>
                            </TouchableOpacity>
                            {isUserComment &&
                                <TouchableOpacity onPress={() => this.confirmDeleteComment()} style={styles.flex_row}>
                                    <Icon
                                        name={'trash'}
                                        size={ratio * 8}
                                        color={'#555'}
                                        style={{ marginRight: 5, paddingTop: 10 }}
                                    />
                                    {deleteJobCommentLoading ? <ActivityIndicator color={'#283E4A'} />
                                        : <Text style={{ paddingTop: 10 }}>delete</Text>}
                                </TouchableOpacity>}
                        </>}
                </View>
                {showReplies && <>
                    <View style={styles.addReplyContainer}>
                        <TextInput
                            placeholder={'Add a reply...'}
                            value={replyComment}
                            onChangeText={(replyComment) => this.setState({ replyComment })}
                            placeholderTextColor="#999"
                            style={styles.replyTextInput}
                        />
                        <TouchableOpacity style={styles.addReplyButton} onPress={() => this.onReplyComment()}>
                            {replyCommentLoading ? <ActivityIndicator color={'#fff'} />
                                : <Text style={{ color: '#fff' }}> Post </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentsContainer}>
                        {comment.replys && comment.replys.map((reply, index) => {
                            return (
                                <ReplyComment
                                    reply={reply}
                                    key={index}
                                    job={job}
                                    comment={comment}
                                    token={token}
                                    currentUser={currentUser}
                                    onDeleteJobReplyLoading={onDeleteJobReplyLoading}
                                    deleteJobReplyLoading={deleteJobReplyLoading}
                                    deleteJobReplyApi={deleteJobReplyApi}
                                />
                            )
                        })}
                    </View>
                </>
                }
            </View >
        );
    }
}

export default CommentComponent;
