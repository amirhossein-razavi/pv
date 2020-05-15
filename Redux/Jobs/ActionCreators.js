import * as ActionTypes from '../ActionTypes';

export const getJobsSuccess = (jobs) => {
    return {
        type: ActionTypes.GETJOBSSSUCCESS,
        payload: jobs
    }
};

export const getJobsFailed = (error) => {
    return {
        type: ActionTypes.GETJOBSFAILED,
        payload: error
    }
};

export const saveJob = (data) => {
    return {
        type: ActionTypes.SAVEJOB,
        payload: data
    }
};

export const onJobComment = (data) => {
    return {
        type: ActionTypes.ONJOBCOMMENT,
        payload: data
    }
};

export const onJobCommentLoading = () => {
    return {
        type: ActionTypes.ONJOBCOMMENTLOADING,
    }
};

export const addedJobCommentToFilter = () => {
    return {
        type: ActionTypes.ADDEDJOBCOMMENTTOFILTER,
    }
};

export const privateMessageSuccess = () => {
    return {
        type: ActionTypes.PRIVATEMESSAGESUCCESS,
    }
};

export const privateMessageFailed = () => {
    return {
        type: ActionTypes.PRIVATEMESSAGEFAILED,
    }
};

export const onPrivateMessageLoading = () => {
    return {
        type: ActionTypes.ONPRIVATEMESSAGELOADING,
    }
};

export const addJobLoading = () => {
    return {
        type: ActionTypes.ADDJOBLOADING,
    }
};

export const onDeleteJobLoading = () => {
    return {
        type: ActionTypes.ONDELETEJOBLOADING,
    }
};

export const onDeleteJob = (id) => {
    return {
        type: ActionTypes.ONDELETEJOB,
        payload: id
    }
};

export const onJobLoading = () => {
    return {
        type: ActionTypes.ONJOBLOADING,
    }
};

export const onJobDisabledLoading = () => {
    return {
        type: ActionTypes.ONJOBDISABLEDLOADING,
    }
};

export const onEditJob = (props) => {
    return {
        type: ActionTypes.ONEDITJOB,
        payload: props
    }
};

export const deleteImage = (id) => {
    return {
        type: ActionTypes.ONDELETEJOBIMAGEPHOTO,
        payload: id
    }
};

export const onDeleteImageLoading = () => {
    return {
        type: ActionTypes.ONDELTEJOBIMAGEPHOTOLOADING,
    }
};

export const deleteJobComment = (id, cid) => {
    return {
        type: ActionTypes.ONDELETECOMMENT,
        payload: { id, cid }
    }
};

export const onDeleteJobCommentLoading = () => {
    return {
        type: ActionTypes.ONDELETECOMMENTLOADING,
    }
};

export const onJobsRefreshing = () => {
    return {
        type: ActionTypes.ONJOBSREFRESHING,
    }
};

export const getReplyComment = (data) => {
    return {
        type: ActionTypes.GETJOBREPLYCOMMENT,
        payload: data
    }
};

export const onJobReplyCommentLoading = () => {
    return {
        type: ActionTypes.ONJOBREPLYCOMMENTLOADING,
    }
};

export const deleteReply = (jobId, commentId, rid) => {
    return {
        type: ActionTypes.ONDELETEREPLY,
        payload: { jobId, commentId, rid }
    }
};

export const onDeleteJobReplyLoading = () => {
    return {
        type: ActionTypes.ONDELETEJOBREPLYLOADING,
    }
};

export const onJobReplyPending = () => {
    return {
        type: ActionTypes.ONJOBREPLYPENDING,
    }
};

export const onChangeLocation = (data) => {
    return {
        type: ActionTypes.ONCHANGELOCATION,
        payload: data
    }
};

export const onSelectLocation = (data) => {
    return {
        type: ActionTypes.ONSELECTLOCATION,
        payload: data
    }
};


