import axios from 'axios';
import { Alert } from 'react-native';

import { configAPI } from '../../src/config';
import { getJobsSuccess, getJobsFailed, saveJob, onJobComment, privateMessageSuccess, privateMessageFailed, onDeleteJob, onEditJob, onJobDisabledLoading, deleteImage, deleteJobComment, getReplyComment, deleteReply, onChangeLocation } from './ActionCreators';


export const jobsApi = (token, id) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/brows_jobs?user_id=${id}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getJobsSuccess(data));
            })
            .catch((err) => {
                dispatch(getJobsFailed(err));
                console.log('error', err)
            });
    }
}

export const saveJobApi = (prop, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const body = {
        'user_id': prop.user_id,
        'job_id': prop.job_id,
    }
    const id = prop.job_id;
    const method = prop.method;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/${method}/${id}`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(saveJob(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const jobCommentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.module_id;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/${id}/comment`, body, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(onJobComment(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const privateMessageApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.module_id;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/${id}/message`, body, headers)
            .then((xhr) => xhr.data)
            .then(() => {
                dispatch(privateMessageSuccess());
            })
            .catch((err) => {
                dispatch(privateMessageFailed())
                console.log('error', err)
            });
    }
}

export const addJobApi = (body, token, navigation) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.user;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/create`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/brows_jobs?user_id=${id}`, headers)
                }
                throw new Error(code)
            })
            .then((xhr) => xhr.data)
            .then((data) => {
                navigation.goBack();
                dispatch(getJobsSuccess(data));
                dispatch(onChangeLocation(''));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const onDeleteApi = (id, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.delete(`${configAPI.appAPI}/job/delete/${id}`, headers)
            .then(() => {
                dispatch(onDeleteJob(id));
            })
            .catch((err) => {
                Alert.alert('Something Wrong , Please Try Again');
                dispatch(onDeleteJob());
                console.log(err)
            });
    }
}

export const editApi = (body, token, props, navigation) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = props.id;
    return dispatch => {
        axios.put(`${configAPI.appAPI}/job/update/${id}`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status, data: code } = result;
                if (status === 200) {
                    navigation.goBack();
                    dispatch(onEditJob(props));
                    dispatch(onChangeLocation(''));
                }
            })
            .catch((err) => {
                Alert.alert('Something Wrong , Please Try Again');
                dispatch(onJobDisabledLoading());
                console.log(err)
            });
    }
}

export const deleteImageApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.post(`${configAPI.appAPI}/deleteJobImage`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    dispatch(deleteImage(body.id));
                }
            })
            .catch((err) => {
                Alert.alert('Something Wrong , Please Try Again');
                console.log(err)
            });
    }
}

export const deleteJobCommentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.jobId;
    const cid = body.commentId;
    return dispatch => {
        axios.put(`${configAPI.appAPI}/job/${id}/comment`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    dispatch(deleteJobComment(id, cid));
                }
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const getJobReplyCommentApi = (commentId, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    return dispatch => {
        axios.get(`${configAPI.appAPI}/job/comment_reply/${commentId}`, headers)
            .then((xhr) => xhr.data)
            .then((data) => {
                dispatch(getReplyComment(data));
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
}

export const jobReplyCommentApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.commentId;
    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/comment_reply`, body, headers)
            .then((xhr) => xhr)
            .then((result) => {
                const { status } = result;
                if (status === 200) {
                    return axios.get(`${configAPI.appAPI}/job/comment_reply/${id}`, headers)
                }
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

export const deleteJobReplyApi = (body, token) => {
    const headers = {
        headers: { 'Authorization': 'bearer ' + token }
    };
    const id = body.jobId;
    const cid = body.commentId;
    const rid = body.replyId;

    return dispatch => {
        axios.post(`${configAPI.appAPI}/job/delete_comment_reply`, body, headers)
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
