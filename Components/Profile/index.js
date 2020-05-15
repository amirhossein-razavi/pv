import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';

import styles from '../../Styles/Profile';
import { userDetailsApi, } from '../../Redux/Profile/axios';
import { postsApi, likeApi, commentApi, userLikedApi, getReplyCommentApi, deleteCommentApi, hidePostApi, replyCommentApi, deleteReplyApi, onDeleteApi, editApi } from '../../Redux/Home/axios';
import { likesModalLoading, onCommentChange, addedCommentToFilter, onRefreshing, onCommentLoading, onDeleteLoading, onReplyCommentLoading, onDeleteReplyLoading, onDeletePostLoading, onEditLoading, onReplyPending } from '../../Redux/Home/ActionCreators';
import { jobsApi, saveJobApi, jobCommentApi, deleteJobCommentApi, jobReplyCommentApi, deleteJobReplyApi, getJobReplyCommentApi } from '../../Redux/Jobs/axios';
import { addedJobCommentToFilter, onJobCommentLoading, onDeleteJobCommentLoading, onJobReplyCommentLoading, onDeleteJobReplyLoading, onJobReplyPending } from '../../Redux/Jobs/ActionCreators';
import Post from '../Home/post';
import Job from '../Jobs/Job'

const mapStateToProps = (state) => ({
    currentUser: state.authLoading.currentUser,
    userToken: state.authLoading.token,
    jobsPosted: state.profile.jobsPosted,
    jobsSaved: state.profile.jobsSaved,
    postsNumber: state.profile.posts,
    posts: state.home.posts,
    profilePostsLoading: state.home.profilePostsLoading,
    postLoading: state.home.loading,
    userLiked: state.home.userLiked,
    addComment: state.home.addComment,
    modalLoading: state.home.modalLoading,
    replyFetchCompleted: state.home.replyFetchCompleted,
    commentLoading: state.home.commentLoading,
    deleteLoading: state.home.deleteLoading,
    replyCommentLoading: state.home.replyCommentLoading,
    deleteReplyLoading: state.home.deleteReplyLoading,
    jobs: state.jobs.jobs,
    profileJobsLoading: state.jobs.profileJobsLoading,
    jobsLoading: state.jobs.loading,
    addJobComment: state.jobs.addComment,
    jobCommentLoading: state.jobs.commentLoading,
    deleteJobCommentLoading: state.jobs.deleteJobCommentLoading,
    replyJobCommentPending: state.jobs.replyCommentPending,
    replyJobCommentLoading: state.jobs.replyCommentLoading,
    deleteJobReplyLoading: state.jobs.deleteJobReplyLoading,
    deletePostLoading: state.home.deletePostLoading,
    editLoading: state.home.editLoading,
    replyCommentPending: state.home.replyCommentPending,
});

const mapDispatchToProps = (dispatch) => ({
    userDetailsApi: (id, token) => dispatch(userDetailsApi(id, token)),
    postsApi: (apiProps) => dispatch(postsApi(apiProps)),
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
    jobsApi: (token, id) => dispatch(jobsApi(token, id)),
    saveJobApi: (body, token) => dispatch(saveJobApi(body, token)),
    jobCommentApi: (body, token) => dispatch(jobCommentApi(body, token)),
    addedJobCommentToFilter: () => dispatch(addedJobCommentToFilter()),
    onJobCommentLoading: () => dispatch(onJobCommentLoading()),
    deleteJobCommentApi: (body, token) => dispatch(deleteJobCommentApi(body, token)),
    onDeleteJobCommentLoading: () => dispatch(onDeleteJobCommentLoading()),
    jobReplyCommentApi: (body, token) => dispatch(jobReplyCommentApi(body, token)),
    onJobReplyCommentLoading: () => dispatch(onJobReplyCommentLoading()),
    onDeleteJobReplyLoading: () => dispatch(onDeleteJobReplyLoading()),
    onJobReplyPending: () => dispatch(onJobReplyPending()),
    deleteJobReplyApi: (body, token) => dispatch(deleteJobReplyApi(body, token)),
    getJobReplyCommentApi: (commentId, token) => dispatch(getJobReplyCommentApi(commentId, token)),
    onDeleteApi: (id, token) => dispatch(onDeleteApi(id, token)),
    onDeletePostLoading: () => dispatch(onDeletePostLoading()),
    onEditLoading: () => dispatch(onEditLoading()),
    onReplyPending: () => dispatch(onReplyPending()),
    editApi: (body, token, editProps) => dispatch(editApi(body, token, editProps)),
});
const { width, height } = Dimensions.get('window');
const ratio = height / width;

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            method: 'post'
        }
    }

    componentDidMount() {
        const { userDetailsApi, currentUser, userToken } = this.props;
        userDetailsApi(currentUser._id, userToken);
        this.getPosts();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Profile',
        }
    }

    async getPosts() {
        // try {
        //     const { userToken, postsApi } = this.props;
        //     NetInfo.addEventListener(state => {
        //         state.isConnected ? postsApi(userToken) : Alert.alert('You Dont Have Connection to Internet')
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
        const { userToken, postsApi } = this.props;
        postsApi(userToken)
    };

    getJobs() {
        // const { jobsApi, userToken, currentUser } = this.props;
        // this.setState({ method: 'saved jobs' })
        // NetInfo.addEventListener(state => {
        //     state.isConnected ? jobsApi(userToken, currentUser._id)
        //         : Alert.alert('You Dont Have Connection to Internet')
        // });
        const { jobsApi, userToken, currentUser } = this.props;
        this.setState({ method: 'saved jobs' })
        jobsApi(userToken, currentUser._id)
    }

    confirmOnLogout() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Logout', onPress: () => this.onLogout() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    onLogout() {
        AsyncStorage.removeItem('User');
        this.props.navigation.navigate('login');
    }

    render() {
        const { currentUser, jobsPosted, jobsSaved, postsNumber, posts, userToken, userLikedApi, userLiked,
            modalLoading, likesModalLoading, likeApi, onCommentChange, commentApi, addedCommentToFilter, addComment,
            getReplyCommentApi, replyFetchCompleted, deleteCommentApi, hidePostApi, onCommentLoading,
            commentLoading, onDeleteLoading, deleteLoading, replyCommentApi, onReplyCommentLoading,
            replyCommentLoading, deleteReplyApi, onDeleteReplyLoading, deleteReplyLoading, jobs, jobsLoading,
            saveJobApi, jobCommentApi, addedJobCommentToFilter, addJobComment, onJobCommentLoading,
            jobCommentLoading, deleteJobCommentLoading, deleteJobCommentApi, replyJobCommentLoading, replyJobCommentPending, jobReplyCommentApi, onJobReplyCommentLoading, onDeleteJobReplyLoading, deleteJobReplyLoading, deleteJobReplyApi, getJobReplyCommentApi, onJobReplyPending, onDeleteApi, onDeletePostLoading, deletePostLoading, onEditLoading, editLoading, editApi, replyCommentPending, onReplyPending, navigation, profilePostsLoading, profileJobsLoading } = this.props;
        const capitalName = currentUser.company.centreObj.name.slice(0, 1);
        const { method } = this.state;
        const userPosts = posts.filter(post => post.user._id === currentUser._id);
        const savedJobs = jobs.filter(job => job.saved_by.includes(currentUser._id));
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.userInfo}>
                    <View style={styles.topInfoPart}>
                        <View style={styles.imageContainer}>
                            {currentUser.company.centreObj.personalInfo.photoUrl ?
                                <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                                    <Image
                                        source={{ uri: currentUser.company.centreObj.personalInfo.photoUrl }}
                                        style={styles.profileImage}
                                    />
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.profileImageView} onPress={() => this.ActionSheet.show()}>
                                    <Text style={styles.profileCapitalName}>{capitalName.toUpperCase()}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.detailsContainer}>
                            <TouchableOpacity style={[styles.flex_row, { alignItems: "center" }]} onPress={() => this.ActionSheet.show()}>
                                <Text style={styles.profileName}>{currentUser.company.centreObj.name}</Text>
                                <Icon
                                    name={'bars'}
                                    size={ratio * 10}
                                    color={'#bbb'}
                                    style={{ marginLeft: 10, marginTop: 1 }}
                                />
                            </TouchableOpacity>
                            <View style={styles.counterContainer}>
                                <View style={[styles.counterInner, styles.counterInnerBorder]}>
                                    <Text style={styles.counterInnerNumber}>{jobsPosted}</Text>
                                    <Text style={styles.counterInnerText}>Jobs Posted</Text>
                                </View>
                                <View style={[styles.counterInner, styles.counterInnerBorder]}>
                                    <Text style={styles.counterInnerNumber}>{jobsSaved}</Text>
                                    <Text style={styles.counterInnerText}>Jobs Saved</Text>
                                </View>
                                <View style={styles.counterInner}>
                                    <Text style={styles.counterInnerNumber}>{postsNumber}</Text>
                                    <Text style={styles.counterInnerText}>posts</Text>
                                </View>
                            </View>
                        </View>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            options={['Edit Profile', 'Settings', 'Logout', 'Cancel']}
                            cancelButtonIndex={3}
                            destructiveButtonIndex={2}
                            onPress={(index) => {
                                if (index === 0) {
                                    Linking.openURL('https://account.projectvectors.com.au/account/profile');
                                } else if (index === 1) {
                                    navigation.navigate('settings')
                                } else if (index === 2) {
                                    this.confirmOnLogout()
                                }
                            }} />
                    </View>
                    <View style={styles.bottomInfoPart}>
                        {currentUser.company.email && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>Email : </Text>
                            <Text style={styles.bio}>{currentUser.company.email}</Text>
                        </View>}
                        {currentUser.company.address1 && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>Address : </Text>
                            <Text style={[styles.bio, { lineHeight: 20 }]}>{currentUser.company.address1}</Text>
                        </View>}
                        {currentUser.company.abn && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>ABN : </Text>
                            <Text style={styles.bio}>{currentUser.company.abn}</Text>
                        </View>}
                    </View>
                </View>
                <View style={styles.userPosts}>
                    <View style={styles.switchContainer}>
                        {method === 'post' ? <>
                            <View style={styles.viewSelected}>
                                <Text style={styles.textSelected}>My Posts</Text>
                            </View>
                            <TouchableOpacity style={styles.viewUnselected} onPress={() => this.getJobs()}>
                                <Text style={styles.textUnselected}>Saved jobs</Text>
                            </TouchableOpacity>
                        </>
                            : <>
                                <TouchableOpacity style={styles.viewUnselected} onPress={() => this.setState({
                                    method: 'post'
                                })}>
                                    <Text style={styles.textUnselected}>My Posts</Text>
                                </TouchableOpacity>
                                <View style={styles.viewSelected}>
                                    <Text style={styles.textSelected}>Saved jobs</Text>
                                </View>
                            </>}
                    </View>
                    {method === 'post' ?
                        profilePostsLoading ?
                            <ActivityIndicator style={{ marginTop: 50 }} color={'#283E4A'} />
                            : userPosts.length ?
                                <FlatList
                                    data={userPosts}
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
                                    keyExtractor={item => item.id}
                                    style={{ width: width }}
                                /> : <View style={{ marginTop: 50 }}>
                                    <Text style={{ fontSize: 17 }}>You have not posted yet</Text>
                                </View>
                        : profileJobsLoading ?
                            <ActivityIndicator style={{ marginTop: 50 }} color={'#283E4A'} />
                            : savedJobs.length ? <FlatList
                                data={savedJobs}
                                renderItem={({ item }) => <Job item={item}
                                    currentUser={currentUser}
                                    saveJobApi={saveJobApi}
                                    token={userToken}
                                    jobCommentApi={jobCommentApi}
                                    addedJobCommentToFilter={addedJobCommentToFilter}
                                    addJobComment={addJobComment}
                                    onJobCommentLoading={onJobCommentLoading}
                                    jobCommentLoading={jobCommentLoading}
                                    onDeleteJobCommentLoading={onDeleteJobCommentLoading}
                                    deleteJobCommentApi={deleteJobCommentApi}
                                    deleteJobCommentLoading={deleteJobCommentLoading}
                                    getJobReplyCommentApi={getJobReplyCommentApi}
                                    replyCommentPending={replyJobCommentPending}
                                    replyCommentLoading={replyJobCommentLoading}
                                    jobReplyCommentApi={jobReplyCommentApi}
                                    onJobReplyCommentLoading={onJobReplyCommentLoading}
                                    onDeleteJobReplyLoading={onDeleteJobReplyLoading}
                                    deleteJobReplyLoading={deleteJobReplyLoading}
                                    deleteJobReplyApi={deleteJobReplyApi}
                                    onJobReplyPending={onJobReplyPending}
                                />}
                                keyExtractor={item => item.id}
                                style={{ width: width }}
                            />
                                : <View style={{ marginTop: 50 }}>
                                    <Text style={{ fontSize: 17 }}>You did not save anything</Text>
                                </View>
                    }
                </View>
            </ScrollView >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
