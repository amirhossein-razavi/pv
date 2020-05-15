import axios from 'axios';
import { configAPI } from '../../src/config';
import { getPostsSuccess, getPostsFailed, onLike, onComment, getUserLiked, getReplyComment, deleteComment, deleteReply, hidePost, onDeletePost, onDisabledLoading, onEditPost, postFailed } from '../../Redux/Home/ActionCreators';
import { Alert } from 'react-native';


export const postsApi = (token, navigation) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/posts`, headers)
            .then((xhr) => {
                return (xhr.data)
            })
            .then((data) => {
                dispatch(getPostsSuccess(data));
            })
            .catch((err) => {
                err.message === 'Request failed with status code 401' ?
                    dispatch(getPostsFailed(navigation))
                    : Alert.alert('Something Wrong , Please Try Later')
                console.log('error', err)
            });
    }
}

export const likeApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.put(`${configAPI.appAPI}/post`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(onLike(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const commentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.id;
    return dispatch => {
        axios.put(`${configAPI.appAPI}/post`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/post/${id}`, headers)
                }
                throw new Error(code)
            })
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(onComment(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}


export const userLikedApi = (likesId, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.post(`${configAPI.appAPI}/companies/list`, likesId, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getUserLiked(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const getReplyCommentApi = (commentId, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/post/comment_reply/${commentId}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getReplyComment(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}


export const deleteCommentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.id;
    const cid = body.cid;
    return dispatch => {
        axios.put(`${configAPI.appAPI}/post/comment`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    dispatch(deleteComment(id, cid));
                }
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const deleteReplyApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.postId;
    const cid = body.commentId;
    const rid = body.replyId;

    return dispatch => {
        axios.post(`${configAPI.appAPI}/post/delete_comment_reply`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    dispatch(deleteReply(id, cid, rid));
                }
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const hidePostApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const url = (body.event === 'hide') ? 'hide_post' : 'unhide_post';
    return dispatch => {
        axios.post(`${configAPI.appAPI}/${url}`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(hidePost(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const replyCommentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.commentId;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/post/comment_reply`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/post/comment_reply/${id}`, headers)
                }
                throw new Error(code)
            })
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getReplyComment(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const postApi = (body, token, navigation) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.post(`${configAPI.appAPI}/post`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/posts`, headers)
                }
                throw new Error(code)
            })
            .then((xhr) => xhr.data)
            .then((data) => {
                navigation.goBack();
                dispatch(getPostsSuccess(data));
            })
            .catch((err) => {
                console.log('error', err)
                dispatch(postFailed());
            });
    }
}

export const onDeleteApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.delete(`${configAPI.appAPI}/post/${id}`, headers)
            .then(() => {
                dispatch(onDeletePost(id));
            })
            .catch((err) => {
                Alert.alert('Something Wrong , Please Try Again');
                dispatch(onDeletePost());
                console.log(err)
            });
    }
}

export const editApi = (body, token, props) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.put(`${configAPI.appAPI}/post`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    dispatch(onEditPost(props));
                }
            })
            .catch((err) => {
                Alert.alert('Something Wrong , Please Try Again');
                dispatch(onDisabledLoading());
                console.log(err)
            });
    }
}
