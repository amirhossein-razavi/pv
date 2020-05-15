import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StatusBar, FlatList, Platform, RefreshControl, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import styles from '../../Styles/Home'
import Post from './post'
import { postsApi, likeApi, commentApi, userLikedApi, getReplyCommentApi, deleteCommentApi, hidePostApi, replyCommentApi, deleteReplyApi, onDeleteApi, editApi } from '../../Redux/Home/axios';
import { likesModalLoading, onCommentChange, addedCommentToFilter, onRefreshing, onCommentLoading, onDeleteLoading, onReplyCommentLoading, onDeleteReplyLoading, onDeletePostLoading, onEditLoading, onReplyPending } from '../../Redux/Home/ActionCreators';

const mapStateToProps = (state) => ({
    posts: state.home.posts,
    loading: state.home.loading,
    currentUser: state.authLoading.currentUser,
    userToken: state.authLoading.token,
    userLiked: state.home.userLiked,
    addComment: state.home.addComment,
    modalLoading: state.home.modalLoading,
    replyFetchCompleted: state.home.replyFetchCompleted,
    refreshing: state.home.refreshing,
    commentLoading: state.home.commentLoading,
    deleteLoading: state.home.deleteLoading,
    replyCommentLoading: state.home.replyCommentLoading,
    deleteReplyLoading: state.home.deleteReplyLoading,
    deletePostLoading: state.home.deletePostLoading,
    editLoading: state.home.editLoading,
    replyCommentPending: state.home.replyCommentPending,
});

const mapDispatchToProps = (dispatch) => ({
    postsApi: (userToken, navigation) => dispatch(postsApi(userToken, navigation)),
    likeApi: (body, token) => dispatch(likeApi(body, token)),
    userLikedApi: (likesId, token) => dispatch(userLikedApi(likesId, token)),
    onCommentChange: (value) => dispatch(onCommentChange(value)),
    onCommentLoading: () => dispatch(onCommentLoading()),
    onReplyCommentLoading: () => dispatch(onReplyCommentLoading()),
    commentApi: (body, token) => dispatch(commentApi(body, token)),
    addedCommentToFilter: () => dispatch(addedCommentToFilter()),
    likesModalLoading: () => dispatch(likesModalLoading()),
    getReplyCommentApi: (commentId, token) => dispatch(getReplyCommentApi(commentId, token)),
    deleteCommentApi: (body, token) => dispatch(deleteCommentApi(body, token)),
    onDeleteLoading: () => dispatch(onDeleteLoading()),
    hidePostApi: (body, token) => dispatch(hidePostApi(body, token)),
    onRefreshing: () => dispatch(onRefreshing()),
    replyCommentApi: (body, token) => dispatch(replyCommentApi(body, token)),
    deleteReplyApi: (body, token) => dispatch(deleteReplyApi(body, token)),
    onDeleteReplyLoading: () => dispatch(onDeleteReplyLoading()),
    onDeleteApi: (id, token) => dispatch(onDeleteApi(id, token)),
    onDeletePostLoading: () => dispatch(onDeletePostLoading()),
    onEditLoading: () => dispatch(onEditLoading()),
    onReplyPending: () => dispatch(onReplyPending()),
    editApi: (body, token, editProps) => dispatch(editApi(body, token, editProps)),
});

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postNumbers: -3,
            filteredPosts: [],
        }
    }

    componentDidMount() {
        this.getPosts();
        // const toFilterPosts = setInterval(() => {
        //     this.setState(state => ({
        //         postNumbers: state.postNumbers + 3,
        //     }))
        //     const { postNumbers } = this.state;
        //     const filteredPosts = posts.slice(postNumbers, postNumbers + 3);
        //     this.setState(state => ({
        //         filteredPosts: [
        //             ...state.filteredPosts,
        //             ...filteredPosts,
        //         ]
        //     }))
        //     if (postNumbers + 3 >= posts.length) {
        //         console.log('done')
        //         clearInterval(toFilterPosts);
        //     }
        // }, 3000);
    }

    async getPosts() {
        // try {
        //     const { userToken, postsApi, navigation } = this.props;
        //     NetInfo.addEventListener(state => {
        //         state.isConnected ? postsApi(userToken, navigation) : Alert.alert('You Dont Have Connection to Internet')
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
        const { userToken, postsApi, navigation } = this.props;
        postsApi(userToken, navigation)
    };


    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => {
                return (
                    <Icon
                        name={'plus'}
                        size={25}
                        color={'#2196F3'}
                        style={{ marginRight: 15 }}
                        onPress={() => navigation.navigate('addPost')}
                    />
                )
            },
            title: 'Home',
        }
    }

    onRefresh() {
        const { onRefreshing, postsApi, userToken, navigation } = this.props;
        onRefreshing();
        postsApi(userToken, navigation);
    }

    render() {
        const { loading, posts, currentUser, userToken, userLikedApi, userLiked, modalLoading, likesModalLoading,
            likeApi, onCommentChange, commentApi, addedCommentToFilter, addComment, getReplyCommentApi,
            replyFetchCompleted, deleteCommentApi, hidePostApi, refreshing, onCommentLoading, commentLoading,
            onDeleteLoading, deleteLoading, replyCommentApi, onReplyCommentLoading, replyCommentLoading,
            deleteReplyApi, onDeleteReplyLoading, deleteReplyLoading, onDeleteApi, onDeletePostLoading, deletePostLoading, onEditLoading, editLoading, editApi, replyCommentPending, onReplyPending ,navigation} = this.props;
        return (
            <>
                <StatusBar barStyle="light-content" />
                {loading ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator color={'#283E4A'} size='small' />
                    </View>

                    : <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "position" : ''} enabled keyboardVerticalOffset={70}>
                        <FlatList
                            data={posts}
                            renderItem={({ item }) => <Post item={item}
                                currentUser={currentUser}
                                userLikedApi={userLikedApi}
                                token={userToken}
                                likeApi={likeApi}
                                userLiked={userLiked}
                                commentApi={commentApi}
                                onCommentChange={onCommentChange}
                                addComment={addComment}
                                addedCommentToFilter={addedCommentToFilter}
                                modalLoading={modalLoading}
                                likesModalLoading={likesModalLoading}
                                getReplyCommentApi={getReplyCommentApi}
                                replyFetchCompleted={replyFetchCompleted}
                                deleteCommentApi={deleteCommentApi}
                                hidePostApi={hidePostApi}
                                onCommentLoading={onCommentLoading}
                                commentLoading={commentLoading}
                                onDeleteLoading={onDeleteLoading}
                                deleteLoading={deleteLoading}
                                replyCommentApi={replyCommentApi}
                                onReplyCommentLoading={onReplyCommentLoading}
                                replyCommentLoading={replyCommentLoading}
                                deleteReplyApi={deleteReplyApi}
                                onDeleteReplyLoading={onDeleteReplyLoading}
                                deleteReplyLoading={deleteReplyLoading}
                                onDeleteApi={onDeleteApi}
                                onDeletePostLoading={onDeletePostLoading}
                                deletePostLoading={deletePostLoading}
                                onEditLoading={onEditLoading}
                                editLoading={editLoading}
                                editApi={editApi}
                                replyCommentPending={replyCommentPending}
                                onReplyPending={onReplyPending}
                                navigation={navigation}
                            />}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            keyExtractor={item => item.id}
                            style={styles.homeComponent}
                        />
                    </KeyboardAvoidingView>
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
