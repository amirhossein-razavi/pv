import * as ActionTypes from '../ActionTypes';

const UsersProfile = (state = { userDetails: [], posts: [], jobsPosted: '', jobsSaved: '', userPosts: '', detailsLoading: true, statsLoading: true, userPostsLoading: true }, action) => {
    switch (action.type) {
        case (ActionTypes.GETUSERSDETAILS):
            const userDetails = action.payload;
            return {
                ...state,
                userDetails,
                detailsLoading: false
            }

        case (ActionTypes.GETUSERSSTATS):
            const stats = action.payload;
            return {
                ...state,
                jobsPosted: stats[1],
                jobsSaved: stats[2],
                userPosts: stats[0],
                statsLoading: false
            }

        case (ActionTypes.GETUSERSPOSTS):
            const posts = action.payload;
            return {
                ...state,
                posts,
                userPostsLoading: false
            }

        case (ActionTypes.GETUSERSLOADING):
            return {
                ...state,
                userPostsLoading: true
            }

        default:
            return state;
    }
};

export { UsersProfile as default };