import * as ActionTypes from '../ActionTypes';

export const getPostsSuccess = (posts) => {
    return {
        type: ActionTypes.GETPOSTSSUCCESS,
        payload: posts
    }
};

export const getPostsFailed = (navigation) => {
    return {
        type: ActionTypes.GETPOSTSFAILED,
        payload: navigation
    }
};

export const onLike = (data) => {
    return {
        type: ActionTypes.ONLIKE,
        payload: data
    }
};

export const onComment = (data) => {
    return {
        type: ActionTypes.ONCOMMENT,
        payload: data
    }
};

export const onCommentChange = (value) => {
    return {
        type: ActionTypes.ONCOMMENTCHANGE,
        payload: value
    }
};

export const addedCommentToFilter = () => {
    return {
        type: ActionTypes.ADDEDCOMMENTTOFILTER,
    }
};

export const onCommentLoading = () => {
    return {
        type: ActionTypes.ONCOMMENTLOADING,
    }
};

export const onReplyCommentLoading = () => {
    return {
        type: ActionTypes.ONREPLYCOMMENTLOADING,
    }
};

export const getUserLiked = (userLiked) => {
    return {
        type: ActionTypes.GETUSERLIKED,
        payload: userLiked
    }
};

export const likesModalLoading = () => {
    return {
        type: ActionTypes.LIKESMODALLOADING,
    }
};

export const getReplyComment = (newComment) => {
    return {
        type: ActionTypes.GETREPLYCOMMENT,
        payload: newComment
    }
};

export const deleteComment = (id, cid) => {
    return {
        type: ActionTypes.DELETECOMMENT,
        payload: { id, cid }
    }
};

export const onDeleteLoading = () => {
    return {
        type: ActionTypes.ONDELETELOADING,
    }
};

export const deleteReply = (postId, commentId, rid) => {
    return {
        type: ActionTypes.DELETEREPLY,
        payload: { postId, commentId, rid }
    }
};

export const onDeleteReplyLoading = () => {
    return {
        type: ActionTypes.ONDELETEREPLYLOADING,
    }
};

export const hidePost = (data) => {
    return {
        type: ActionTypes.HIDEPOST,
        payload: data
    }
};

export const onRefreshing = () => {
    return {
        type: ActionTypes.ONREFRESHING,
    }
};

export const onPostLoading = () => {
    return {
        type: ActionTypes.ONPOSTLOADING,
    }
};

export const onDeletePost = (id) => {
    return {
        type: ActionTypes.ONDELETEPOST,
        payload: id
    }
};

export const onDeletePostLoading = () => {
    return {
        type: ActionTypes.ONDELETEPOSTLOADING,
    }
};

export const onEditLoading = () => {
    return {
        type: ActionTypes.ONEDITLOADING,
    }
};

export const onDisabledLoading = () => {
    return {
        type: ActionTypes.ONDISABLEDLOADING,
    }
};

export const onEditPost = (props) => {
    return {
        type: ActionTypes.ONEDITPOST,
        payload: props
    }
};

export const postFailed = () => {
    return {
        type: ActionTypes.POSTFAILED,
    }
};

export const onReplyPending = () => {
    return {
        type: ActionTypes.ONREPLYPENDING,
    }
};


