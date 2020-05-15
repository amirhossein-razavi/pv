import * as ActionTypes from '../ActionTypes';
import { Alert, AsyncStorage } from 'react-native';

const Home = (state = { posts: [], loading: true, userLiked: [], addComment: false, modalLoading: true, refreshing: false, commentLoading: false, replyCommentLoading: false, deleteLoading: false, deleteReplyLoading: false, postLoading: false, deletePostLoading: false, editLoading: false, replyCommentPending: false, profilePostsLoading: true }, action) => {
    switch (action.type) {

        case (ActionTypes.GETPOSTSSUCCESS):
            const posts = action.payload;
            return {
                ...state,
                posts,
                loading: false,
                refreshing: false,
                postLoading: false,
                profilePostsLoading: false,
            }

        case (ActionTypes.GETPOSTSFAILED):
            const navigation = action.payload;
            Alert.alert(
                'Session expired , Please login again',
                '',
                [
                    {
                        text: 'Go to Login', onPress: () => {
                            navigation.navigate('login');
                            AsyncStorage.removeItem('User');
                        }
                    },
                ],
                { cancelable: false },
            );
            return {
                ...state,
                refreshing: false,
                loading: false,
                profilePostsLoading: false,
            }

        case (ActionTypes.ONLIKE):
            const newData = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === newData._id) {
                        const newLikes = newData.likes;
                        post.likes = [...newLikes]
                        return post;
                    } else return post;
                })
            }

        case (ActionTypes.ONCOMMENT):
            const updatedData = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === updatedData._id) {
                        const newComments = updatedData.comments;
                        post.comments = [...newComments]
                        return post;
                    } else return post;
                }),
                addComment: true,
                commentLoading: false
            }

        case (ActionTypes.ONCOMMENTLOADING):
            return {
                ...state,
                commentLoading: true,
            }

        case (ActionTypes.ONREPLYCOMMENTLOADING):
            return {
                ...state,
                replyCommentLoading: true,
            }

        case (ActionTypes.ONCOMMENTCHANGE):
            const comment = action.payload;
            return {
                ...state,
                comment,
            }

        case (ActionTypes.ADDEDCOMMENTTOFILTER):
            return {
                ...state,
                addComment: false,
            }

        case (ActionTypes.GETUSERLIKED):
            const userLiked = action.payload;
            return {
                ...state,
                userLiked,
                modalLoading: false
            }

        case (ActionTypes.LIKESMODALLOADING):
            return {
                ...state,
                modalLoading: true
            }

        case (ActionTypes.GETREPLYCOMMENT):
            const newComment = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === newComment._id) {
                        post.comments.map((comment) => {
                            if (comment._id === newComment.comments[0]._id) {
                                const newReplies = newComment.comments[0].replys;
                                comment.replys = [...newReplies.reverse()]
                                return comment;
                            } else return comment;
                        })
                        return post
                    }
                    else return post
                }),
                addComment: true,
                replyCommentLoading: false,
                replyCommentPending: false
            }

        case (ActionTypes.DELETECOMMENT):
            const { id, cid } = action.payload;
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === id) {
                        const filteredComments = post.comments.filter(comment => comment._id !== cid);
                        post.comments = [...filteredComments];
                        return post;
                    } else return post;
                }),
                addComment: true,
                deleteLoading: false
            }

        case (ActionTypes.ONDELETELOADING):
            return {
                ...state,
                deleteLoading: true
            }

        case (ActionTypes.DELETEREPLY):
            const { postId, commentId, rid } = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === postId) {
                        post.comments.map((comment) => {
                            if (comment._id === commentId) {
                                const filteredReplies = comment.replys.filter(reply => reply._id !== rid);
                                comment.replys = [...filteredReplies];
                                return comment;
                            } else return comment;
                        })
                        return post
                    }
                    else return post
                }),
                deleteReplyLoading: false,
            }

        case (ActionTypes.ONDELETEREPLYLOADING):
            return {
                ...state,
                deleteReplyLoading: true
            }

        case (ActionTypes.HIDEPOST):
            const data = action.payload;
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === data._id) {
                        const newHiddenPosts = data.hide_by;
                        post.hide_by = [...newHiddenPosts];
                        return post;
                    } else return post;
                }),
            }

        case (ActionTypes.ONREFRESHING):
            return {
                ...state,
                refreshing: true
            }

        case (ActionTypes.ONPOSTLOADING):
            return {
                ...state,
                postLoading: true
            }

        case (ActionTypes.POSTFAILED):
            Alert.alert('Something Wrong , Please Try Again')
            return {
                ...state,
                postLoading: false
            }

        case (ActionTypes.ONDELETEPOST):
            const deleteId = action.payload;
            if (deleteId) {
                return {
                    ...state,
                    posts: state.posts.filter(post => post._id !== deleteId),
                    deletePostLoading: false
                }
            } else {
                return {
                    ...state,
                    deletePostLoading: false
                }
            }

        case (ActionTypes.ONDELETEPOSTLOADING):
            return {
                ...state,
                deletePostLoading: true
            }

        case (ActionTypes.ONEDITLOADING):
            return {
                ...state,
                editLoading: true
            }

        case (ActionTypes.ONDISABLEDLOADING):
            return {
                ...state,
                editLoading: false
            }

        case (ActionTypes.ONREPLYPENDING):
            return {
                ...state,
                replyCommentPending: true
            }

        case (ActionTypes.ONEDITPOST):
            const props = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === props.postId) {
                        post.post = props.text;
                        post.src_url = props.url;
                        return post;
                    } else return post
                }),
                editLoading: false
            }

        default:
            return state;
    }
};

export { Home as default };