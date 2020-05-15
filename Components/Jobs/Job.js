import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Image, TouchableOpacity, Alert, } from 'react-native';
import moment from 'moment';
import { Dimensions } from 'react-native';
import Images from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { BottomModal, ModalContent } from 'react-native-modals';

import EditJob from './editJob';
import CommentComponent from './commentComponent';
import styles from '../../Styles/Jobs/job';


const { width, height } = Dimensions.get('window');
const ratio = height / width;

class Job extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: false,
            saved: '',
            showComment: false,
            commentNumbers: 0,
            filteredComments: [],
            comment: '',
            modalVisible: false,
            message: '',
            editModalVisible: false
        }
    }

    componentDidMount() {
        const { item, currentUser } = this.props;
        const isSaved = item.saved_by.includes(currentUser._id);
        isSaved ? this.setState({ saved: true }) : this.setState({ saved: false });
        //     // Image.getSize(item.src_url, (width, height) => {
        //     //     console.log('sizing done', width, height)
        //     //     if (width + height > 0) {
        //     //         this.setState({
        //     //             height: height * (width / width)
        //     //         });
        //     //     }
        //     // });
        const filteredComments = item.comments.slice(0, 3);
        this.setState({
            filteredComments
        })
        //     const isLiked = item.likes.includes(currentUser._id);
        //     isLiked ? this.setState({ like: true }) : this.setState({ like: false });
        //     const isHidden = item.hide_by.includes(currentUser._id);
        //     isHidden ? this.setState({ hidden: true }) : this.setState({ hidden: false });
    }

    filterComments() {
        const { item, addedJobCommentToFilter } = this.props;
        const filteredComments = item.comments.slice(0, 3);
        this.setState({
            filteredComments
        })
        addedJobCommentToFilter();
    }

    // showOptions = () => {
    //     const { currentUser, item, token, hidePostApi } = this.props;
    //     ActionSheetIOS.showActionSheetWithOptions(
    //         {
    //             options: ['Report Post', 'Hide Post', 'Cancel'],
    //             destructiveButtonIndex: 2,
    //         },
    //         (buttonIndex) => {
    //             if (buttonIndex === 0) {
    //                 console.log('Report Post Button Clicked')
    //             } else if (buttonIndex === 1) {
    //                 this.setState(state => ({
    //                     hidden: !state.hidden,
    //                 }))
    //                 const body = {
    //                     'event': 'hide',
    //                     'id': item._id,
    //                     'authUserId': currentUser._id
    //                 }
    //                 hidePostApi(body, token);
    //             }
    //         },
    //     );
    // }

    // onLike() {
    //     const { item, currentUser, likeApi, token } = this.props;
    //     const { like } = this.state;
    //     const body = {
    //         'event': like ? 'unlike' : 'like',
    //         'id': item._id,
    //         'authUserId': currentUser._id
    //     }
    //     likeApi(body, token);
    //     this.setState(state => ({
    //         like: !state.like,
    //     }))
    // }

    onComment() {
        const { item, currentUser, jobCommentApi, token, onJobCommentLoading } = this.props;
        const { comment } = this.state;
        const body = {
            'module_id': item._id,
            'sender_id': currentUser._id,
            'text': {
                'message': comment
            }
        }
        if (comment.length) {
            onJobCommentLoading();
            jobCommentApi(body, token)
        } else Alert.alert('Write Something');

        this.setState({ comment: '' })
    }

    showComments = () => {
        const { item, getJobReplyCommentApi, token, onJobReplyPending } = this.props;
        const newFilteredComments = this.state.filteredComments.slice(0, 3);
        this.setState(state => ({
            commentNumbers: 0,
            showComment: !state.showComment,
            filteredComments: newFilteredComments
        }));

        const hasReply = item.comments.filter((comment) => comment.replys.length);
        hasReply.length && onJobReplyPending();
        const isrepliesFetched = (hasReply.length && hasReply[0].replys[0].user._id) ? true : false;
        if (!isrepliesFetched) {
            for (var i = 0; i < hasReply.length; i++) {
                getJobReplyCommentApi(hasReply[i]._id, token)
            }
        }
    }

    showMoreComments() {
        const { commentNumbers } = this.state;
        this.setState(state => ({
            commentNumbers: state.commentNumbers + 3,
        }))
        const { item } = this.props;
        const filteredComments = item.comments.slice(commentNumbers + 3, commentNumbers + 6);
        this.setState(state => ({
            filteredComments: [
                ...state.filteredComments,
                ...filteredComments,
            ]
        }))
    }

    // showLikesModal() {
    //     const { userLikedApi, item, token } = this.props;
    //     userLikedApi(item.likes, token);
    //     this.setState(state => ({ modalVisible: !state.modalVisible }))
    // }

    // modalLoading() {
    //     const { likesModalLoading } = this.props;
    //     likesModalLoading();
    //     this.setState(state => ({ modalVisible: !state.modalVisible }))
    // }

    // onUnhide() {
    //     const { currentUser, item, token, hidePostApi } = this.props;

    //     this.setState(state => ({
    //         hidden: !state.hidden,
    //     }))
    //     const body = {
    //         'event': 'unhide',
    //         'id': item._id,
    //         'authUserId': currentUser._id
    //     }
    //     hidePostApi(body, token);
    // }

    onSave() {
        const { item, currentUser, token, saveJobApi } = this.props;
        const { saved } = this.state;
        this.setState(state => ({ saved: !state.saved }))
        const body = {
            'method': saved ? 'unsave' : 'save',
            'user_id': currentUser._id,
            'job_id': item._id,
        }
        saveJobApi(body, token);
    }

    onSendMessage() {
        const { item, currentUser, privateMessageApi, token, onPrivateMessageLoading } = this.props;
        const { message } = this.state;
        // const body = {
        //     'action': "job-message",
        //     'message_type': "new",
        //     'to': item.user.email,
        //     'subject': "New Message For Job Post",
        //     'text': {
        //         message: message,
        //     },
        //     'reply_to': `${item._id}-${currentUser._id}-${item.user.email}`,
        //     'module': "Job",
        //     'module_id': item._id,
        //     'sender_id': currentUser._id,
        //     'receiver_id': item.user.email,
        //     'parent_message_id': null,
        //     'inline': [
        //         "./dist/assets/images/PV_Logo3.png"
        //     ],
        // };

        // 'to': item.user.email
        // 'from_name': currentUser.company.centreObj.name,
        // 'subject': "Message"
        // 'text': {
        //     'message': message
        // }
        // 'sender_id': currentUser._id,
        // 'receiver_id': item.user.email,
        // 'reply_to': `${item._id}-${currentUser._id}-${item.user.email}`,
        // 'module': "Chat"
        // 'module_id': item._id,
        // 'action': "other"
        // parent_message_id: "5"
        // message_type: "reply"

        this.setState({ message: '', modalVisible: false })
        // onPrivateMessageLoading();
        // privateMessageApi(body, token);
    }

    confirmDeleteJob() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Delete', onPress: () => this.deleteJob() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deleteJob() {
        const { onDeleteApi, item, token, onDeleteJobLoading } = this.props;
        onDeleteJobLoading();
        onDeleteApi(item._id, token);
    }

    closeModal() {
        this.setState({
            editModalVisible: false
        })
    }

    render() {
        const { item, addJobComment, jobCommentLoading, privateMessageLoading, currentUser, deleteJobLoading, token, onDeleteJobCommentLoading, deleteJobCommentApi, deleteJobCommentLoading, replyCommentPending, jobReplyCommentApi, onJobReplyCommentLoading, replyCommentLoading, onDeleteJobReplyLoading, deleteJobReplyLoading, deleteJobReplyApi } = this.props;
        const { showMore, saved, showComment, comment, filteredComments, message } = this.state;
        const capitalName = item.user.company.centreObj.name.slice(0, 1);
        const getPostTime = item.createdAt.slice(0, 10);
        const timeFromNow = moment(getPostTime, "YYYY-MM-DD").fromNow();
        const commentsCounter = item.comments.length;
        const moreComments = item.comments.length > 3 ? true : false;
        addJobComment && this.filterComments();
        const isUserJob = item.user._id === currentUser._id ? true : false;
        return (
            <View style={styles.jobComponent}>
                <View style={styles.flex_row}>
                    <TouchableOpacity style={styles.authorImageContainer} onPress={() => this.props.navigation.navigate('usersProfile', { name: item.user.company.centreObj.name, id: item.user._id })}>
                        {item.user.company.centreObj.personalInfo.photoUrl ?
                            <Image source={{ uri: item.user.company.centreObj.personalInfo.photoUrl }} style={styles.authorImage} />
                            : <View style={styles.authorImageView}><Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text></View>
                        }
                    </TouchableOpacity>
                    <View style={styles.authorDetails}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('usersProfile', { name: item.user.company.centreObj.name, id: item.user._id })}>
                            <Text style={styles.authorName}>{item.user.company.centreObj.name}</Text>
                        </TouchableOpacity>
                        {item.user.company.role && <View style={[styles.flex_row, { marginTop: 5 }]}>
                            <Icon
                                name={'user'}
                                size={15}
                                color={'#b2b2b2'}
                                style={{ marginRight: 5, marginTop: 1 }}
                            />
                            <Text style={styles.role}>{item.user.company.role} at {item.user.company.bussiness_name}</Text>
                        </View>}
                    </View>
                    <View style={styles.jobTime}>
                        <View style={[styles.flex_row, { marginTop: 5, alignItems: "center" }]}>
                            <Icon
                                name={'history'}
                                size={15}
                                color={'#b2b2b2'}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.jobTimeText}>{timeFromNow}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <View style={[styles.flex_row, styles.jobDetails]}>
                    <Text style={styles.detailsTitle}>Looking for :</Text>
                    <View style={styles.field}><Text style={styles.fieldText}>{item.field}</Text></View>
                    {Boolean(item.sub_field) && <View style={styles.sub_field}><Text style={styles.sub_fieldText}>{item.sub_field}</Text></View>}
                </View>
                <View style={[styles.flex_row, styles.jobDetails]}>
                    <Text style={styles.detailsTitle}>Start Date :</Text>
                    <Text style={styles.detailText}>{item.startDate.slice(0, 10)}</Text>
                </View>
                <View style={[styles.flex_row, styles.jobDetails]}>
                    <Text style={[styles.detailsTitle, { marginBottom: 10 }]}>Location :</Text>
                    <Text style={styles.detailText}>{item.location}</Text>
                </View>
                {Boolean(item.image) && (
                    <View style={styles.postImageContainer}>
                        <Images
                            source={{ uri: item.image }}
                            indicator={ProgressBar}
                            style={{ width: '100%', height: width * 9 / 16 }} />
                    </View>
                )}
                <View style={styles.postDescriptionContainer}>
                    {!Boolean(showMore) ? (
                        <>
                            <Text style={styles.postDescription}> {item.description.slice(0, 150)}{' '}</Text>
                            {Boolean(item.description.length > 150) && (
                                <Text style={styles.postDescriptionMore}
                                    onPress={() => this.setState({ showMore: true })}
                                >more...</Text>
                            )}
                        </>
                    ) : (
                            <>
                                <Text style={styles.postDescription}>{item.description}</Text>
                                <Text style={styles.postDescriptionMore}
                                    onPress={() => this.setState({ showMore: false })}
                                >less...</Text>
                            </>
                        )}
                </View>
                <View style={styles.postLogos}>
                    <TouchableOpacity style={styles.commentLogoContainer} onPress={() => this.showComments()}>
                        <Text style={{ fontSize: ratio * 7.5 }}>comment</Text>
                        <View style={styles.commentsCounterContainer}>
                            <Text style={styles.commentsCounterNumber}>{commentsCounter}</Text>
                        </View>
                    </TouchableOpacity>
                    {isUserJob ? deleteJobLoading ? <ActivityIndicator color={'#283E4A'} style={styles.commentLogoContainer} />
                        : <TouchableOpacity
                            style={styles.commentLogoContainer}
                            onPress={() => this.confirmDeleteJob()} >
                            <Text style={{ fontSize: ratio * 7.5 }}>Delete Job</Text>
                        </TouchableOpacity>
                        : <View></View>}
                    {/* : <TouchableOpacity */}
                    {/* style={styles.commentLogoContainer} */}
                    {/* onPress={() => { this.setState({ modalVisible: true }) }} > */}
                    {/* <Text style={{ fontSize: ratio * 7.5 }}>Private Message</Text> */}
                    {/* </TouchableOpacity>} */}
                    {isUserJob ? <TouchableOpacity
                        style={styles.commentLogoContainer}
                        onPress={() => this.props.navigation.navigate('editJob', { item: item })} >
                        <Text style={{ fontSize: ratio * 7.5 }}>Edit Job</Text>
                    </TouchableOpacity>
                        : <TouchableOpacity style={styles.flex_row} onPress={() => this.onSave()}>
                            {saved ? <>
                                <Icon
                                    name={'archive'}
                                    size={15}
                                    color={'#b2b2b2'}
                                    style={{ marginRight: 5, marginTop: 10 }}
                                />
                                <Text style={{ marginTop: 10, fontSize: ratio * 7.5 }}>Saved</Text>
                            </>
                                : <Text style={{ marginTop: 10, fontSize: ratio * 7.5 }}>Save Job</Text>}
                        </TouchableOpacity>}
                </View >
                {
                    showComment && <View>
                        <View style={styles.addCommentContainer}>
                            <Icon
                                name={'user'}
                                size={ratio * 10}
                                color={'#8F8A99'}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                placeholder={'Add a comment...'}
                                value={comment}
                                onChangeText={(value) => this.setState({ comment: value })}
                                placeholderTextColor="#999"
                                style={styles.commentTextInput}
                            />
                            <TouchableOpacity style={styles.addCommentButton} onPress={() => this.onComment()}>
                                {jobCommentLoading ? <ActivityIndicator size='small' color={'#fff'} />
                                    : <Text style={{ color: '#fff' }}> Post </Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.commentsContainer}>
                            {filteredComments && filteredComments.map((comment, index) => {
                                return (
                                    <CommentComponent
                                        comment={comment}
                                        key={index}
                                        // getReplyCommentApi={getReplyCommentApi}
                                        token={token}
                                        // replyFetchCompleted={replyFetchCompleted}
                                        currentUser={currentUser}
                                        job={item}
                                        onDeleteJobCommentLoading={onDeleteJobCommentLoading}
                                        deleteJobCommentApi={deleteJobCommentApi}
                                        deleteJobCommentLoading={deleteJobCommentLoading}
                                        replyCommentPending={replyCommentPending}
                                        jobReplyCommentApi={jobReplyCommentApi}
                                        onJobReplyCommentLoading={onJobReplyCommentLoading}
                                        replyCommentLoading={replyCommentLoading}
                                        onDeleteJobReplyLoading={onDeleteJobReplyLoading}
                                        deleteJobReplyLoading={deleteJobReplyLoading}
                                        deleteJobReplyApi={deleteJobReplyApi}
                                    // deleteCommentApi={deleteCommentApi}
                                    // onDeleteLoading={onDeleteLoading}
                                    // deleteLoading={deleteLoading}
                                    // replyCommentApi={replyCommentApi}
                                    // onReplyCommentLoading={onReplyCommentLoading}
                                    // replyCommentLoading={replyCommentLoading}
                                    // deleteReplyApi={deleteReplyApi}
                                    // onDeleteReplyLoading={onDeleteReplyLoading}
                                    // deleteReplyLoading={deleteReplyLoading}
                                    />
                                )
                            })}
                        </View>
                        {moreComments && <View style={styles.moreCommentsContainer}>
                            <TouchableOpacity style={styles.moreComments} onPress={() => this.showMoreComments()}>
                                <Text style={styles.moreCommentsText}>show more comments</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                }
                <BottomModal
                    visible={this.state.modalVisible}
                    onTouchOutside={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <ModalContent>
                        <ScrollView>
                            <View>
                                <TextInput
                                    style={styles.textArea}
                                    value={message}
                                    placeholder="Enter Your Message"
                                    placeholderTextColor="#999"
                                    multiline={true}
                                    onChangeText={(message) => this.setState({ message })}
                                />
                            </View>
                            <TouchableOpacity style={styles.sendButton} onPress={() => this.onSendMessage()}>
                                {privateMessageLoading ? <ActivityIndicator color={'#fff'} />
                                    : <Text style={styles.sendButtonText}>
                                        Send
                                     </Text>}
                            </TouchableOpacity>
                        </ScrollView>
                    </ModalContent>
                </BottomModal>
            </View >
        );
    }
}

export default Job;
