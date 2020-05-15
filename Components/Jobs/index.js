import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StatusBar, FlatList, TextInput, RefreshControl, TouchableOpacity, ScrollView, Picker, Dimensions, Switch, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomModal, ModalContent } from 'react-native-modals';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Job from './Job'
import styles from '../../Styles/Jobs'
import { jobsApi, saveJobApi, jobCommentApi, privateMessageApi, onDeleteApi, deleteJobCommentApi, getJobReplyCommentApi, jobReplyCommentApi, deleteJobReplyApi } from '../../Redux/Jobs/axios';
import { addedJobCommentToFilter, onJobCommentLoading, onPrivateMessageLoading, onDeleteJobLoading, onDeleteJobCommentLoading, onJobsRefreshing, onJobReplyCommentLoading, onDeleteJobReplyLoading, onJobReplyPending } from '../../Redux/Jobs/ActionCreators';

const mapStateToProps = (state) => ({
    jobs: state.jobs.jobs,
    jobsLoading: state.jobs.loading,
    currentUser: state.authLoading.currentUser,
    userToken: state.authLoading.token,
    addJobComment: state.jobs.addComment,
    jobCommentLoading: state.jobs.commentLoading,
    privateMessageLoading: state.jobs.privateMessageLoading,
    deleteJobLoading: state.jobs.deleteJobLoading,
    deleteJobCommentLoading: state.jobs.deleteJobCommentLoading,
    refreshing: state.jobs.refreshing,
    replyCommentPending: state.jobs.replyCommentPending,
    replyCommentLoading: state.jobs.replyCommentLoading,
    deleteJobReplyLoading: state.jobs.deleteJobReplyLoading,
});

const mapDispatchToProps = (dispatch) => ({
    jobsApi: (token, id) => dispatch(jobsApi(token, id)),
    saveJobApi: (body, token) => dispatch(saveJobApi(body, token)),
    jobCommentApi: (body, token) => dispatch(jobCommentApi(body, token)),
    addedJobCommentToFilter: () => dispatch(addedJobCommentToFilter()),
    onJobCommentLoading: () => dispatch(onJobCommentLoading()),
    privateMessageApi: (body, token) => dispatch(privateMessageApi(body, token)),
    onPrivateMessageLoading: () => dispatch(onPrivateMessageLoading()),
    onDeleteJobLoading: () => dispatch(onDeleteJobLoading()),
    onDeleteApi: (id, token) => dispatch(onDeleteApi(id, token)),
    deleteJobCommentApi: (body, token) => dispatch(deleteJobCommentApi(body, token)),
    onDeleteJobCommentLoading: () => dispatch(onDeleteJobCommentLoading()),
    onJobsRefreshing: () => dispatch(onJobsRefreshing()),
    getJobReplyCommentApi: (commentId, token) => dispatch(getJobReplyCommentApi(commentId, token)),
    jobReplyCommentApi: (body, token) => dispatch(jobReplyCommentApi(body, token)),
    onJobReplyCommentLoading: () => dispatch(onJobReplyCommentLoading()),
    onDeleteJobReplyLoading: () => dispatch(onDeleteJobReplyLoading()),
    onJobReplyPending: () => dispatch(onJobReplyPending()),
    deleteJobReplyApi: (body, token) => dispatch(deleteJobReplyApi(body, token)),
    // likeApi: (body, token) => dispatch(likeApi(body, token)),
    // userLikedApi: (likesId, token) => dispatch(userLikedApi(likesId, token)),
    // onCommentChange: (value) => dispatch(onCommentChange(value)),
    // commentApi: (body, token) => dispatch(commentApi(body, token)),
    // likesModalLoading: () => dispatch(likesModalLoading()),
    // deleteCommentApi: (body, token) => dispatch(deleteCommentApi(body, token)),
    // hidePostApi: (body, token) => dispatch(hidePostApi(body, token)),
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;
const categories = ['Select Category', 'Sole Trader', 'Builder', 'Supplier', 'Construction Company', 'Consultancy']

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            category: 'Select Category',
            changedCategory: 'Select Category',
            keyword: '',
            changedKeyword: '',
            switchValue: false,
            changedSwitchValue: false,
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    async getJobs() {
        // const { jobsApi, userToken, currentUser } = this.props;
        // NetInfo.addEventListener(state => {
        //     state.isConnected ? jobsApi(userToken, currentUser._id)
        //         : Alert.alert('You Dont Have Connection to Internet')
        // });
        const { jobsApi, userToken, currentUser } = this.props;
        jobsApi(userToken, currentUser._id)
    };


    static navigationOptions = (props) => {
        return {
            headerRight: () => {
                return (
                    <Icon
                        name={'plus'}
                        size={25}
                        color={'#2196F3'}
                        style={{ marginRight: 15 }}
                        onPress={() => {
                            props.navigation.navigate('addJob')
                        }
                        }
                    />
                )
            },
            title: 'Jobs',
        }
    }

    onRefresh() {
        const { onJobsRefreshing, jobsApi, userToken, currentUser } = this.props;
        onJobsRefreshing();
        jobsApi(userToken, currentUser._id)
    }

    render() {
        const { jobs, currentUser, jobsLoading, saveJobApi, userToken, jobCommentApi, addedJobCommentToFilter,
            addJobComment, onJobCommentLoading, jobCommentLoading, privateMessageLoading,
            privateMessageApi, onPrivateMessageLoading, onDeleteJobLoading, onDeleteApi, deleteJobLoading, navigation, onDeleteJobCommentLoading, deleteJobCommentApi, deleteJobCommentLoading, refreshing, getJobReplyCommentApi, replyCommentPending, replyCommentLoading, jobReplyCommentApi, onJobReplyCommentLoading, onDeleteJobReplyLoading, deleteJobReplyLoading, deleteJobReplyApi, onJobReplyPending } = this.props;
        const { modalVisible, category, changedCategory, keyword, changedKeyword, switchValue, changedSwitchValue } = this.state;
        const filteredJobsbyKeyword = keyword ? jobs.filter(job => job.title.toLowerCase().includes(keyword.toLowerCase())) : jobs;
        const filteredJobsbyCategories = category === 'Select Category' ? filteredJobsbyKeyword : filteredJobsbyKeyword.filter(job => job.field === category);
        const filteredJobsbyUserJobs = switchValue ? filteredJobsbyCategories.filter(job => job.user._id === currentUser._id) : filteredJobsbyCategories;
        return (
            <>
                <StatusBar barStyle="light-content" />
                {jobsLoading ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator color={'#283E4A'} />
                    </View>
                    : jobs.length ?
                        <KeyboardAwareScrollView>
                            <ScrollView>
                                <TouchableOpacity style={styles.filterButton}
                                    onPress={() => this.setState({ modalVisible: true })}>
                                    <Icon
                                        name={'filter'}
                                        size={ratio * 12}
                                        color={'#fff'}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text style={{ color: '#fff', fontSize: ratio * 10 }}>Filter Jobs</Text>
                                </TouchableOpacity>
                                <BottomModal
                                    visible={modalVisible}
                                    onTouchOutside={() => {
                                        this.setState({ modalVisible: false });
                                    }}
                                >
                                    <ModalContent style={Platform.OS === 'ios' ? { height: 500 } : { height: 380 }}>
                                        <KeyboardAwareScrollView>
                                            <ScrollView>
                                                <Text style={[styles.title, { marginBottom: 10 }]}>Keywords</Text>
                                                <TextInput
                                                    value={changedKeyword}
                                                    style={styles.textArea}
                                                    placeholder="Job Title"
                                                    placeholderTextColor="#999"
                                                    onChangeText={(changedKeyword) => this.setState({
                                                        changedKeyword
                                                    })}
                                                />
                                                <Text style={[styles.title, { marginTop: 30 }]}>Category</Text>
                                                {Platform.OS === 'ios' ? <Picker
                                                    selectedValue={changedCategory}
                                                    style={{ width: width, marginTop: -30 }}
                                                    onValueChange={(itemValue) =>
                                                        this.setState({ changedCategory: itemValue })
                                                    }>
                                                    {categories && categories.map((category, index) => {
                                                        return (
                                                            <Picker.Item label={category} value={category} key={index} />
                                                        )
                                                    })}
                                                </Picker>
                                                    : <View style={styles.androidPicker}>
                                                        <Picker
                                                            selectedValue={changedCategory}
                                                            onValueChange={(itemValue) =>
                                                                this.setState({ changedCategory: itemValue })
                                                            }>
                                                            {categories && categories.map((category, index) => {
                                                                return (
                                                                    <Picker.Item label={category} value={category} key={index} />
                                                                )
                                                            })}
                                                        </Picker>
                                                    </View>
                                                }
                                                <View style={{ flexDirection: "row", marginTop: 30 }}>
                                                    <Text style={styles.title}>My Jobs</Text>
                                                    <Switch
                                                        onValueChange={() => this.setState(state => ({
                                                            changedSwitchValue: !state.changedSwitchValue
                                                        }))}
                                                        value={changedSwitchValue}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.sendButton} onPress={() => this.setState({ modalVisible: false, category: changedCategory, keyword: changedKeyword, switchValue: changedSwitchValue })}>
                                                    <Text style={styles.sendButtonText}>
                                                        Filter
                                                    </Text>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </KeyboardAwareScrollView>
                                    </ModalContent>
                                </BottomModal>
                                <FlatList
                                    data={filteredJobsbyUserJobs}
                                    renderItem={({ item }) => <Job item={item}
                                        currentUser={currentUser}
                                        saveJobApi={saveJobApi}
                                        token={userToken}
                                        jobCommentApi={jobCommentApi}
                                        addedJobCommentToFilter={addedJobCommentToFilter}
                                        addJobComment={addJobComment}
                                        onJobCommentLoading={onJobCommentLoading}
                                        jobCommentLoading={jobCommentLoading}
                                        privateMessageLoading={privateMessageLoading}
                                        privateMessageApi={privateMessageApi}
                                        onPrivateMessageLoading={onPrivateMessageLoading}
                                        onDeleteJobLoading={onDeleteJobLoading}
                                        onDeleteApi={onDeleteApi}
                                        deleteJobLoading={deleteJobLoading}
                                        navigation={navigation}
                                        onDeleteJobCommentLoading={onDeleteJobCommentLoading}
                                        deleteJobCommentApi={deleteJobCommentApi}
                                        deleteJobCommentLoading={deleteJobCommentLoading}
                                        getJobReplyCommentApi={getJobReplyCommentApi}
                                        replyCommentPending={replyCommentPending}
                                        replyCommentLoading={replyCommentLoading}
                                        jobReplyCommentApi={jobReplyCommentApi}
                                        onJobReplyCommentLoading={onJobReplyCommentLoading}
                                        onDeleteJobReplyLoading={onDeleteJobReplyLoading}
                                        deleteJobReplyLoading={deleteJobReplyLoading}
                                        deleteJobReplyApi={deleteJobReplyApi}
                                        onJobReplyPending={onJobReplyPending}
                                    />}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                    keyExtractor={item => item.id}
                                    style={styles.jobComponent}
                                />
                            </ScrollView>
                        </KeyboardAwareScrollView>
                        : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 17 }}>There is no Job</Text>
                        </View>
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
