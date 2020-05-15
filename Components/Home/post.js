import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, ActionSheetIOS, TextInput, Modal, ActivityIndicator, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
import { BottomModal, ModalContent } from 'react-native-modals';
import { Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Images from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import CommentComponent from './commentComponent';
import LikesModal from './likesModal';
import styles from '../../Styles/Home/posts';
import { hidePostApi } from '../../Redux/Home/axios';
import { round } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ratio = height / width;
const plusImage = require('../../src/assets/images/plus.png');

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            showMore: false,
            showComment: false,
            commentNumbers: 0,
            filteredComments: [],
            modalVisible: false,
            editModalVisible: false,
            reportModalVisible: false,
            comment: '',
            isliked: undefined,
            hidden: undefined,
            like: undefined,
            promptVisible: true,
            text: this.props.item.post,
            image: this.props.item.src_url,
            imageData: []
        }
    }

    componentDidMount() {
        const { item, currentUser } = this.props;
        // Image.getSize(item.src_url, (width, height) => {
        //     console.log('sizing done', width, height)
        //     if (width + height > 0) {
        //         this.setState({
        //             height: height * (screenWidth / width)
        //         });
        //     }
        // });
        const filteredComments = item.comments.slice(0, 3);
        this.setState({
            filteredComments
        })
        const isLiked = item.likes.includes(currentUser._id);
        isLiked ? this.setState({ like: true }) : this.setState({ like: false });
        const isHidden = item.hide_by.includes(currentUser._id);
        isHidden ? this.setState({ hidden: true }) : this.setState({ hidden: false });
    }

    filterComments() {
        const { item, addedCommentToFilter } = this.props;
        const filteredComments = item.comments.slice(0, 3);
        this.setState({
            filteredComments
        })
        addedCommentToFilter();
    }

    onLike() {
        const { item, currentUser, likeApi, token } = this.props;
        const { like } = this.state;
        const body = {
            'event': like ? 'unlike' : 'like',
            'id': item._id,
            'authUserId': currentUser._id
        }
        likeApi(body, token);
        this.setState(state => ({
            like: !state.like,
        }))
    }

    onComment() {
        const { item, currentUser, commentApi, token, onCommentLoading } = this.props;
        const { comment } = this.state;
        const body = {
            'event': 'comment',
            'id': item._id,
            'comment': comment,
            'user': currentUser._id
        }
        if (comment.length) {
            onCommentLoading();
            commentApi(body, token)
        } else Alert.alert('Write Something');

        this.setState({ comment: '' })
    }

    showComments = () => {
        const { item, getReplyCommentApi, token, onReplyPending } = this.props;
        const newFilteredComments = this.state.filteredComments.slice(0, 3);
        this.setState(state => ({
            commentNumbers: 0,
            showComment: !state.showComment,
            filteredComments: newFilteredComments
        }))

        const hasReply = item.comments.filter((comment) => comment.replys.length);
        hasReply.length && onReplyPending();
        const isrepliesFetched = (hasReply.length && hasReply[0].replys[0].user._id) ? true : false;
        if (!isrepliesFetched) {
            for (var i = 0; i < hasReply.length; i++) {
                getReplyCommentApi(hasReply[i]._id, token)
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

    showLikesModal() {
        const { userLikedApi, item, token } = this.props;
        userLikedApi(item.likes, token);
        this.setState(state => ({ modalVisible: !state.modalVisible }))
    }

    modalLoading() {
        const { likesModalLoading } = this.props;
        likesModalLoading();
        this.setState(state => ({ modalVisible: !state.modalVisible }))
    }

    onUnhide() {
        const { currentUser, item, token, hidePostApi } = this.props;

        this.setState(state => ({
            hidden: !state.hidden,
        }))
        const body = {
            'event': 'unhide',
            'id': item._id,
            'authUserId': currentUser._id
        }
        hidePostApi(body, token);
    }

    closeModal() {
        this.setState({
            modalVisible: false,
            editModalVisible: false
        })
    }

    confirmDeletePost() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Delete', onPress: () => this.deletePost() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deletePost() {
        const { onDeleteApi, item, token, onDeletePostLoading } = this.props;
        onDeletePostLoading();
        onDeleteApi(item._id, token);
    }

    pickImage() {
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            this.setState({
                imageData: image,
                imageHeight: image.height * (width / image.width)
            })
        });
    }

    takeImage() {
        ImagePicker.openCamera({
            includeBase64: true
        }).then(image => {
            this.setState({
                imageData: image,
                imageHeight: image.height * (width / image.width)
            })
        });
    }

    onEdit() {
        const { item, editApi, currentUser, token, onEditLoading } = this.props;
        const { imageData, text, image } = this.state;
        this.setState({ editModalVisible: false })
        onEditLoading();
        const body = {
            'event': "edit",
            'id': item._id,
            'authUserId': currentUser._id,
            'post': text,
            'file_type': "image",
            'src_url': imageData.data ? `data:${imageData.mime};base64,${imageData.data}` : image ? image : '',
        };
        const editProps = {
            'postId': item._id,
            'text': text,
            'url': imageData.path
        }
        editApi(body, token, editProps);
    }

    render() {
        const { showMore, showComment, filteredComments, comment, like, hidden, text, image, imageData, reportModalVisible, message } = this.state;
        const { item, currentUser, token, userLiked, modalLoading, addComment, replyFetchCompleted, deleteCommentApi, commentLoading, onDeleteLoading, deleteLoading, replyCommentApi, onReplyCommentLoading, replyCommentLoading, deleteReplyApi, onDeleteReplyLoading, deleteReplyLoading, deletePostLoading, editLoading, replyCommentPending, onReplyPending } = this.props;
        const getPostTime = item.createdAt.slice(0, 10);
        const timeFromNow = moment(getPostTime, "YYYY-MM-DD").fromNow();
        const likesCounter = item.likes.length;
        const commentsCounter = item.comments.length;
        const capitalName = item.company.centreObj.name.slice(0, 1);
        addComment && this.filterComments();
        const isUserPost = (item.user._id === currentUser._id) ? true : false;
        const moreComments = commentsCounter > 3 ? true : false;
        const isDisableComments = item.user.settings.privacy.filter(i => i === 'disable_comments_on_my_posts');
        return (
            <View style={styles.postComponent}>
                {hidden ? <View style={styles.hidePost}>
                    <Text style={{ fontSize: 17, marginHorizontal: 10, textAlign: "center" }}>You'll no longer see this post in your feed.</Text>
                    <TouchableOpacity style={styles.undoContainer} onPress={() => this.onUnhide()}>
                        <Icon
                            name={'undo'}
                            size={17}
                            color={'#b2b2b2'}
                            style={{ marginRight: 5 }}
                        />
                        <Text style={{ fontSize: 15 }}>Undo</Text>
                    </TouchableOpacity>
                </View>
                    : <>
                        <View style={styles.flex_row}>
                            <TouchableOpacity style={styles.authorImageContainer} onPress={() => this.props.navigation.navigate('usersProfile', { name: item.user.company.centreObj.name, id: item.user._id })}>
                                {item.company.centreObj.personalInfo.photoUrl ?
                                    <Image source={{ uri: item.company.centreObj.personalInfo.photoUrl }} style={styles.authorImage} />
                                    : <View style={styles.authorImageView}><Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text></View>
                                }
                            </TouchableOpacity>
                            <View style={styles.authorDetails}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('usersProfile', { name: item.user.company.centreObj.name, id: item.user._id })}>
                                    <Text style={styles.authorName}>{item.company.centreObj.name}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                                    <Icon
                                        name={'history'}
                                        size={15}
                                        color={'#b2b2b2'}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={styles.postTime}>{timeFromNow}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.option} onPress={() => this.ActionSheet.show()}>
                                {deletePostLoading ? <ActivityIndicator color={'#283E4A'} />
                                    : <Icon
                                        name={'ellipsis-v'}
                                        size={25}
                                        color={'#8e8e8e'}
                                    />}
                            </TouchableOpacity>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                options={['Hide Post', isUserPost ? 'Delete Post' : 'Report Post', 'Cancel']}
                                cancelButtonIndex={2}
                                destructiveButtonIndex={[1]}
                                onPress={(index) => {
                                    if (index === 0) {
                                        this.setState(state => ({
                                            hidden: !state.hidden,
                                        }))
                                        const body = {
                                            'event': 'hide',
                                            'id': item._id,
                                            'authUserId': currentUser._id
                                        }
                                        hidePostApi(body, token);
                                    } else if (index === 1) {
                                        isUserPost ? this.confirmDeletePost() : this.setState({ reportModalVisible: true })
                                    }
                                }
                                } />
                            <BottomModal
                                visible={reportModalVisible}
                                onTouchOutside={() => {
                                    this.setState({ reportModalVisible: false });
                                }}
                            >
                                <ModalContent>
                                    <ScrollView>
                                        <View>
                                            <TextInput
                                                style={styles.textArea}
                                                value={message}
                                                placeholder="Enter Report Message"
                                                placeholderTextColor="#999"
                                                multiline={true}
                                                onChangeText={(message) => this.setState({ message })}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.sendButton} onPress={() => this.setState({ reportModalVisible: false, message: '' })}>
                                            <Text style={styles.sendButtonText}>
                                                Send
                                             </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </ModalContent>
                            </BottomModal>
                        </View>
                        {Boolean(item.src_url) && (
                            <View style={styles.postImageContainer}>
                                <Images
                                    source={{ uri: item.src_url }}
                                    indicator={ProgressBar}
                                    style={{ width: '100%', height: width * 9 / 16 }} />
                            </View>
                        )}
                        <View style={styles.postDescriptionContainer}>
                            {!Boolean(showMore) ? (
                                <>
                                    <Text style={styles.postDescription}> {item.post.slice(0, 150)}{' '}</Text>
                                    {Boolean(item.post.length > 150) && (
                                        <Text style={styles.postDescriptionMore}
                                            onPress={() => this.setState({ showMore: true })}
                                        >more...</Text>
                                    )}
                                </>
                            ) : (
                                    <>
                                        <Text style={styles.postDescription}>{item.post}</Text>
                                        <Text style={styles.postDescriptionMore}
                                            onPress={() => this.setState({ showMore: false })}
                                        >less...</Text>
                                    </>
                                )}
                        </View>
                        <View style={styles.postOptions}>
                            <View style={styles.likeComment}>
                                <TouchableOpacity onPress={() => this.showLikesModal()}>
                                    <Text style={styles.likesCounter}>{likesCounter}  Likes</Text>
                                </TouchableOpacity>
                                {!isDisableComments.length && <TouchableOpacity onPress={() => this.showComments()}>
                                    <Text style={styles.commentsCounter}>{commentsCounter}  Comments</Text>
                                </TouchableOpacity>}
                            </View>
                            {isUserPost ? editLoading ? <ActivityIndicator color={'#283E4A'} style={{ marginRight: 15 }} />
                                : <TouchableOpacity onPress={() => this.setState({ editModalVisible: true })}>
                                    <Icon
                                        name={'edit'}
                                        size={ratio * 12}
                                        color={'#555'}
                                        style={{ marginRight: 15 }}
                                    />
                                </TouchableOpacity>
                                : <View></View>}
                        </View>
                        <View style={styles.postLogos}>
                            <TouchableOpacity onPress={() => this.onLike()} style={styles.flex_row}>
                                <Icon
                                    name={like ? 'thumbs-down' : 'thumbs-up'}
                                    size={ratio * 10}
                                    color={'#555'}
                                    style={{ marginRight: 5, paddingTop: 10 }}
                                />
                                <Text style={{ marginRight: 30, paddingTop: 10, fontSize: ratio * 7.5 }}>{like ? 'Unlike' : 'like'}</Text>
                            </TouchableOpacity>
                            {!isDisableComments.length && <TouchableOpacity onPress={() => this.showComments()} style={styles.flex_row}>
                                <Icon
                                    name={'comment'}
                                    size={ratio * 10}
                                    color={'#555'}
                                    style={{ marginRight: 5, paddingTop: 10 }}
                                />
                                <Text style={{ paddingTop: 10, fontSize: ratio * 8 }}>comment</Text>
                            </TouchableOpacity>}
                        </View>
                        {showComment && <View>
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
                                    {commentLoading ? <ActivityIndicator size='small' color={'#fff'} />
                                        : <Text style={{ color: '#fff' }}> Post </Text>}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.commentsContainer}>
                                {filteredComments && filteredComments.map((comment, index) => {
                                    return (
                                        <CommentComponent
                                            comment={comment}
                                            key={index}
                                            token={token}
                                            replyFetchCompleted={replyFetchCompleted}
                                            currentUser={currentUser}
                                            post={item}
                                            deleteCommentApi={deleteCommentApi}
                                            onDeleteLoading={onDeleteLoading}
                                            deleteLoading={deleteLoading}
                                            replyCommentApi={replyCommentApi}
                                            onReplyCommentLoading={onReplyCommentLoading}
                                            replyCommentLoading={replyCommentLoading}
                                            deleteReplyApi={deleteReplyApi}
                                            onDeleteReplyLoading={onDeleteReplyLoading}
                                            deleteReplyLoading={deleteReplyLoading}
                                            replyCommentPending={replyCommentPending}
                                        />
                                    )
                                })}
                            </View>
                            {moreComments && <View style={styles.moreCommentsContainer}>
                                <View style={styles.moreComments}>
                                    <Text style={styles.moreCommentsText} onPress={() => this.showMoreComments()}>show more comments</Text>
                                </View>
                            </View>}
                        </View>}
                        <Modal
                            animationType="slide"
                            visible={this.state.modalVisible}
                            onRequestClose={() => this.closeModal()}
                            onDismiss={() => this.closeModal()}
                        >
                            <View>
                                <View style={styles.modalHeader}>
                                    <Icon
                                        name={'chevron-left'}
                                        size={20}
                                        color={'#fff'}
                                        onPress={() => this.modalLoading()}
                                        style={{ marginTop: 4 }}
                                    />
                                    <Text style={{ marginLeft: 10, color: '#fff', fontSize: 20 }}
                                        onPress={() => this.modalLoading()}>back</Text>
                                </View>
                                <ScrollView>
                                    {userLiked && !modalLoading ? userLiked.map((like, index) => {
                                        return (
                                            <LikesModal like={like} key={index} />
                                        )
                                    }) : <ActivityIndicator color={'#283E4A'} size={50} />}
                                </ScrollView>

                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            visible={this.state.editModalVisible}
                            onRequestClose={() => this.closeModal()}
                            onDismiss={() => this.closeModal()}
                        >
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.modalHeader}>
                                    <Icon
                                        name={'chevron-left'}
                                        size={20}
                                        color={'#fff'}
                                        onPress={() => this.closeModal()}
                                        style={{ marginTop: 4 }}
                                    />
                                    <Text style={{ marginLeft: 10, color: '#fff', fontSize: 20 }}
                                        onPress={() => this.closeModal()}>back</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.title}>Post Description</Text>
                                    <View style={styles.textAreaContainer}>
                                        <TextInput
                                            style={styles.textArea}
                                            value={text}
                                            placeholder="Write Your Post"
                                            placeholderTextColor="#999"
                                            multiline={true}
                                            onChangeText={(text) => this.setState({ text })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.title}>Image</Text>
                                    {Boolean(image) ? <>
                                        <Image source={{ uri: image }} style={{ width: width / 1.2, height: 200, borderRadius: 10, marginTop: 10 }} />
                                        <TouchableOpacity onPress={() => this.setState({ image: '' })}>
                                            <Icon
                                                name={'trash'}
                                                size={ratio * 13}
                                                color={'#555'}
                                                style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
                                            />
                                        </TouchableOpacity>
                                    </>
                                        : imageData.path ? <>
                                            <Image source={{ uri: imageData.path }} style={{ width: width / 1.2, height: 200, borderRadius: 10, marginTop: 10 }} />
                                            <TouchableOpacity onPress={() => this.setState({ imageData: [] })}>
                                                <Icon
                                                    name={'trash'}
                                                    size={ratio * 13}
                                                    color={'#555'}
                                                    style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
                                                />
                                            </TouchableOpacity>
                                        </>
                                            : <TouchableOpacity style={styles.ImageContainer} onPress={() => this.ActionSheet.show()}>
                                                <Image source={plusImage} style={styles.plusImage} />
                                                <Text style={styles.plusImageText}>Add Image</Text>
                                            </TouchableOpacity>}
                                </View>
                                <ActionSheet
                                    ref={o => this.ActionSheet = o}
                                    options={['Take Picture', 'Library', 'Cancel']}
                                    cancelButtonIndex={2}
                                    onPress={(index) => {
                                        if (index === 0) {
                                            this.takeImage();
                                        } else if (index === 1) {
                                            this.pickImage();
                                        }
                                    }} />
                                <View style={[styles.container, { flexDirection: "row" }]}>
                                    <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => this.closeModal()}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onEdit()}>
                                        <Text style={styles.buttonText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Modal>
                    </>}
            </View>
        );
    }
}

export default Post;
