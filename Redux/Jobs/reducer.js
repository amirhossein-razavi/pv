import * as ActionTypes from '../ActionTypes';
import { Alert } from 'react-native';

const Jobs = (state = { jobs: [], loading: true, addComment: false, commentLoading: false, privateMessageLoading: false, jobLoading: false, deleteJobLoading: false, editLoading: false, deleteImageLoading: false, deleteJobCommentLoading: false, refreshing: false, replyCommentLoading: false, replyCommentPending: false, deleteJobReplyLoading: false, profileJobsLoading: true, location: '' }, action) => {
    switch (action.type) {

        case (ActionTypes.GETJOBSSSUCCESS):
            const jobs = action.payload;
            return {
                ...state,
                jobs,
                loading: false,
                jobLoading: false,
                refreshing: false,
                profileJobsLoading: false
            }

        case (ActionTypes.GETJOBSFAILED):
            const error = action.payload;
            console.log(error);
            return {
                ...state,
            }

        case (ActionTypes.SAVEJOB):
            const data = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === data._id) {
                        const newSavedJobs = data.saved_by;
                        job.saved_by = [...newSavedJobs]
                        return job;
                    } else return job;
                })
            }

        case (ActionTypes.ONJOBCOMMENT):
            const newData = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === newData._id) {
                        const newComments = newData.comments;
                        job.comments = [...newComments]
                        return job;
                    } else return job;
                }),
                addComment: true,
                commentLoading: false
            }

        case (ActionTypes.ONJOBCOMMENTLOADING):
            return {
                ...state,
                commentLoading: true,
            }

        case (ActionTypes.ADDEDJOBCOMMENTTOFILTER):
            return {
                ...state,
                addComment: false,
            }

        case (ActionTypes.PRIVATEMESSAGESUCCESS):
            return {
                ...state,
                privateMessageLoading: false
            }

        case (ActionTypes.PRIVATEMESSAGEFAILED):
            Alert.alert('Somthing Wrong. Try again');
            return {
                ...state,
                privateMessageLoading: false
            }

        case (ActionTypes.ONPRIVATEMESSAGELOADING):
            return {
                ...state,
                privateMessageLoading: true
            }

        case (ActionTypes.ADDJOBLOADING):
            return {
                ...state,
                jobLoading: true
            }

        case (ActionTypes.ONDELETEJOBLOADING):
            return {
                ...state,
                deleteJobLoading: true
            }

        case (ActionTypes.ONDELETEJOB):
            const deleteId = action.payload;
            if (deleteId) {
                return {
                    ...state,
                    jobs: state.jobs.filter(job => job._id !== deleteId),
                    deleteJobLoading: false
                }
            } else {
                return {
                    ...state,
                    deleteJobLoading: false
                }
            }

        case (ActionTypes.ONJOBLOADING):
            return {
                ...state,
                editLoading: true
            }

        case (ActionTypes.ONJOBDISABLEDLOADING):
            return {
                ...state,
                editLoading: false
            }

        case (ActionTypes.ONEDITJOB):
            const props = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === props.id) {
                        job.title = props.title;
                        job.description = props.description;
                        job.field = props.field;
                        job.sub_field = props.sub_field;
                        job.location = props.location;
                        job.startDate = props.startDate;
                        job.image = props.image;
                        return job;
                    } else return job
                }),
                editLoading: false
            }

        case (ActionTypes.ONDELETEJOBIMAGEPHOTO):
            const jobImageId = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === jobImageId) {
                        job.image = '';
                        return job;
                    } else return job
                }),
                deleteImageLoading: false
            }

        case (ActionTypes.ONDELTEJOBIMAGEPHOTOLOADING):
            return {
                ...state,
                deleteImageLoading: true
            }

        case (ActionTypes.ONDELETECOMMENTLOADING):
            return {
                ...state,
                deleteJobCommentLoading: true
            }


        case (ActionTypes.ONDELETECOMMENT):
            const { id, cid } = action.payload;
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    if (job._id === id) {
                        const filteredComments = job.comments.filter(comment => comment._id !== cid);
                        job.comments = [...filteredComments];
                        return job;
                    } else return job;
                }),
                addComment: true,
                deleteJobCommentLoading: false
            }

        case (ActionTypes.ONJOBSREFRESHING):
            return {
                ...state,
                refreshing: true
            }

        case (ActionTypes.GETJOBREPLYCOMMENT):
            const newComment = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === newComment._id) {
                        job.comments.map((comment) => {
                            if (comment._id === newComment.comments[0]._id) {
                                const newReplies = newComment.comments[0].replys;
                                comment.replys = [...newReplies.reverse()]
                                return comment;
                            } else return comment;
                        })
                        return job
                    }
                    else return job
                }),
                addComment: true,
                replyCommentLoading: false,
                replyCommentPending: false
            }

        case (ActionTypes.ONJOBREPLYCOMMENTLOADING):
            return {
                ...state,
                replyCommentLoading: true,
            }


        case (ActionTypes.ONDELETEREPLY):
            const { jobId, commentId, rid } = action.payload;
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if (job._id === jobId) {
                        job.comments.map((comment) => {
                            if (comment._id === commentId) {
                                const filteredReplies = comment.replys.filter(reply => reply._id !== rid);
                                comment.replys = [...filteredReplies];
                                return comment;
                            } else return comment;
                        })
                        return job
                    }
                    else return job
                }),
                deleteJobReplyLoading: false,
            }

        case (ActionTypes.ONDELETEJOBREPLYLOADING):
            return {
                ...state,
                deleteJobReplyLoading: true
            }

        case (ActionTypes.ONJOBREPLYPENDING):
            return {
                ...state,
                replyCommentPending: true
            }

        case (ActionTypes.ONCHANGELOCATION):
            const location = action.payload;
            return {
                ...state,
                location
            }

        case (ActionTypes.ONSELECTLOCATION):
            const selectedLocation = action.payload;
            return {
                ...state,
                location: selectedLocation
            }


        default:
            return state;
    }
};

export { Jobs as default };