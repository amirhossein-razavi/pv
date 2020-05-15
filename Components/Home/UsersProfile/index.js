import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import styles from '../../../Styles/UserProfile';
import { userDetailsApi, userStatsApi, userPostsApi } from '../../../Redux/UsersProfile/axios'
import { getUsersLoading } from '../../../Redux/UsersProfile/ActionCreators'
import { likeApi, commentApi, userLikedApi, getReplyCommentApi, deleteCommentApi, hidePostApi, replyCommentApi, deleteReplyApi, onDeleteApi, editApi } from '../../../Redux/Home/axios';
import { likesModalLoading, onCommentChange, addedCommentToFilter, onRefreshing, onCommentLoading, onDeleteLoading, onReplyCommentLoading, onDeleteReplyLoading, onDeletePostLoading, onEditLoading, onReplyPending } from '../../../Redux/Home/ActionCreators';
import Post from '../post';

const mapDispatchToProps = (dispatch) => ({
    userDetailsApi: (id, token) => dispatch(userDetailsApi(id, token)),
    userStatsApi: (id, token) => dispatch(userStatsApi(id, token)),
    userPostsApi: (id, token) => dispatch(userPostsApi(id, token)),
    getUsersLoading: () => dispatch(getUsersLoading()),
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

const mapStateToProps = (state) => ({
    userDetails: state.usersProfile.userDetails[0],
    posts: state.usersProfile.posts,
    jobsPosted: state.usersProfile.jobsPosted,
    jobsSaved: state.usersProfile.jobsSaved,
    userPosts: state.usersProfile.userPosts,
    userPostsLoading: state.usersProfile.userPostsLoading,
    detailsLoading: state.usersProfile.detailsLoading,
    statsLoading: state.usersProfile.statsLoading,
    currentUser: state.authLoading.currentUser,
    userToken: state.authLoading.token,
    userLiked: state.home.userLiked,
    addComment: state.home.addComment,
    modalLoading: state.home.modalLoading,
    replyFetchCompleted: state.home.replyFetchCompleted,
    commentLoading: state.home.commentLoading,
    deleteLoading: state.home.deleteLoading,
    replyCommentLoading: state.home.replyCommentLoading,
    deleteReplyLoading: state.home.deleteReplyLoading,
    deletePostLoading: state.home.deletePostLoading,
    editLoading: state.home.editLoading,
    replyCommentPending: state.home.replyCommentPending,
});
const { width, height } = Dimensions.get('window');
const ratio = height / width;

class UsersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id')
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        }
    }
    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        const { userDetailsApi, userStatsApi, userPostsApi, userToken, getUsersLoading } = this.props;
        const { id } = this.state;
        getUsersLoading();
        userDetailsApi(id, userToken);
        userStatsApi(id, userToken);
        userPostsApi(id, userToken);
    }


    render() {
        const { userDetails, posts, jobsPosted, jobsSaved, userPosts, userPostsLoading, detailsLoading, statsLoading, currentUser, userToken, userLikedApi, userLiked,
            modalLoading, likesModalLoading, likeApi, onCommentChange, commentApi, addedCommentToFilter, addComment,
            getReplyCommentApi, replyFetchCompleted, deleteCommentApi, hidePostApi, onCommentLoading,
            commentLoading, onDeleteLoading, deleteLoading, replyCommentApi, onReplyCommentLoading,
            replyCommentLoading, deleteReplyApi, onDeleteReplyLoading, deleteReplyLoading
            , onDeleteApi, onDeletePostLoading, deletePostLoading, onEditLoading, editLoading, editApi, replyCommentPending, onReplyPending, navigation } = this.props;
        return (
            (!userPostsLoading && !detailsLoading && !statsLoading) ? <ScrollView style={{ flex: 1 }}>
                <View style={styles.userInfo}>
                    <View style={styles.topInfoPart}>
                        <View style={styles.imageContainer}>
                            {userDetails.user_id.company.centreObj.personalInfo.photoUrl ?
                                <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                                    <Image
                                        source={{ uri: userDetails.user_id.company.centreObj.personalInfo.photoUrl }}
                                        style={styles.profileImage}
                                    />
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.profileImageView}>
                                    <Text style={styles.profileCapitalName}>{userDetails.user_id.company.centreObj.name.slice(0, 1).toUpperCase()}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.detailsContainer}>
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
                                    <Text style={styles.counterInnerNumber}>{userPosts}</Text>
                                    <Text style={styles.counterInnerText}>posts</Text>
                                </View>
                            </View>
                            {/* <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('messaging')}>
                                <Icon
                                    name={'envelope'}
                                    size={ratio * 10}
                                    color={'#fff'}
                                    style={{ marginRight: 10, marginTop: 1 }}
                                />
                                <Text style={styles.buttonText}>Message</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={styles.bottomInfoPart}>
                        {Boolean(userDetails.user_id.company.email && userDetails.user_id.settings.profileDetails.filter(item => item === 'show_my_email').length) && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>Email : </Text>
                            <Text style={styles.bio}>{userDetails.user_id.company.email}</Text>
                        </View>}
                        {Boolean(userDetails.user_id.company.address1 && userDetails.user_id.settings.profileDetails.filter(item => item === 'show_my_business_address').length) && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>Address : </Text>
                            <Text style={[styles.bio, { lineHeight: 20 }]}>{userDetails.user_id.company.address1}</Text>
                        </View>}
                        {Boolean(userDetails.user_id.company.abn && userDetails.user_id.settings.profileDetails.filter(item => item === 'show_my_abn').length) && <View style={styles.bioContainer}>
                            <Text style={styles.titles}>ABN : </Text>
                            <Text style={styles.bio}>{userDetails.user_id.company.abn}</Text>
                        </View>}
                    </View>
                </View>
                <View style={styles.userPosts}>
                    {posts.length ? <FlatList
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
                        keyExtractor={item => item.id}
                        style={{ width: width }}
                    />
                        : <Text style={{ fontSize: ratio * 9, marginTop: 20 }}>{navigation.getParam('name')} has not posted yet</Text>}
                </View>
            </ScrollView>
                : <View style={{ flex: 1, justifyContent: 'center', alignitems: "center" }} >
                    <ActivityIndicator color={'283E4A'} />
                </View >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersProfile);
