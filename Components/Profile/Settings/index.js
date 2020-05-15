import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';

import { getSettingsApi ,saveSettingsApi} from '../../../Redux/Profile/axios';
import { onChangeSettings,onChnageJobNotifRange,saveSettingsLoading,userSettingsLoading } from '../../../Redux/Profile/ActionCreators';
import styles from '../../../Styles/Profile';

const mapStateToProps = (state) => ({
    currentUser: state.authLoading.currentUser,
    userToken: state.authLoading.token,
    settings: state.profile.settings,
    saveSettingsLoading: state.profile.saveSettingsLoading,
    notif1: state.profile.notif1,
    notif2: state.profile.notif2,
    notif3: state.profile.notif3,
    notif4: state.profile.notif4,
    notif5: state.profile.notif5,
    notif6: state.profile.notif6,
    privacy1: state.profile.privacy1,
    privacy2: state.profile.privacy2,
    profile1: state.profile.profile1,
    profile2: state.profile.profile2,
    profile3: state.profile.profile3,
    profile4: state.profile.profile4,
    profile5: state.profile.profile5,
    jobNotif: state.profile.jobNotif,
    jobNotifRange: state.profile.jobNotifRange,
    settingsLoading: state.profile.settingsLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getSettingsApi: (id, token) => dispatch(getSettingsApi(id, token)),
    onChangeSettings: (prop , value) => dispatch(onChangeSettings(prop , value)),
    onChnageJobNotifRange: (value) => dispatch(onChnageJobNotifRange(value)),
    saveSettingsApi: (body , token , navigation) => dispatch(saveSettingsApi(body , token,navigation)),
    userSettingsLoading: () => dispatch(userSettingsLoading()),
    onSaveSettingsLoading: () => dispatch(saveSettingsLoading()),
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false
        }
    }

    componentDidMount() {
        const { getSettingsApi, userToken, currentUser,userSettingsLoading } = this.props;
        userSettingsLoading();
        getSettingsApi(currentUser._id, userToken);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
        }
    }

    onSave(){
        const { notif1,notif2,notif3,notif4,notif5,notif6 , privacy1 , privacy2 , profile1,profile2,profile3,profile4,profile5,jobNotif, jobNotifRange ,saveSettingsApi , userToken , currentUser,onSaveSettingsLoading , navigation} = this.props;
        onSaveSettingsLoading();
        const body = {
            settings:{
                user_id: currentUser._id,
                notifications: [ notif1 && 'receiving_comments_on_my_post' , notif2 && 'receiving_reply_to_my_comments_on_post' , notif3 && 'receiving_comments_on_my_job',notif4 && 'receiving_reply_to_my_comments_on_job',notif5 && 'receiving_private_message_on_my_job',notif6 && 'receiving_message'],
                privacy: [privacy1&& 'disable_messaging' , privacy2 && 'disable_comments_on_my_posts'],
                profileDetails: [profile1&& 'show_my_email' , profile2 && 'show_my_business_address',profile3&& 'show_my_abn' , profile4 && 'show_my_building_license',profile5&& 'show_my_website'],
                jobNotifications: [jobNotif && 'receiving_notification_of_any_job_posted_related_to_my_field'],
                jobNotificationsRange: jobNotifRange
            }
        }
        saveSettingsApi(body , userToken , navigation)
    }


    render() {
        const { settingsLoading ,settings ,notif1,notif2,notif3,notif4,notif5,notif6 , privacy1 , privacy2 , profile1,profile2,profile3,profile4,profile5,jobNotif, jobNotifRange , onChangeSettings,onChnageJobNotifRange,saveSettingsLoading} = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                {settingsLoading ? <ActivityIndicator color={'#2196F3'} style={{marginTop : 100}}/>
                  : <>
                  <Text style={{ margin: 10, fontSize: 17 , marginTop: 20 }}>Please send notification when:</Text>
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif1' , notif1)
                        }}
                        isChecked={notif1}
                        rightTextView={<Text style={styles.checkBoxText}>I have a comment on my post on home page
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif2' , notif2)
                        }}
                        isChecked={notif2}
                        rightTextView={<Text style={styles.checkBoxText}>Someone replied to my comment on home page</Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif3' , notif3)
                        }}
                        isChecked={notif3}
                        rightTextView={<Text style={styles.checkBoxText}>I have a comment on my posted job</Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif4' , notif4)
                        }}
                        isChecked={notif4}
                        rightTextView={<Text style={styles.checkBoxText}>Someone replied to my comment on my posted jobs</Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif5' , notif5)
                        }}
                        isChecked={notif5}
                        rightTextView={<Text style={styles.checkBoxText}>I have a private message on my posted jobs
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('notif6' , notif6)
                        }}
                        isChecked={notif6}
                        rightTextView={<Text style={styles.checkBoxText}>I received a message
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <Text style={{ margin: 10, fontSize: 17 , marginTop: 40 }}>Privacy:</Text>
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('privacy1' , privacy1)
                        }}
                        isChecked={privacy1}
                        rightTextView={<Text style={styles.checkBoxText}>Disable Messaging
    
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('privacy2' , privacy2)
                        }}
                        isChecked={privacy2}
                        rightTextView={<Text style={styles.checkBoxText}>Disable comments on my posts
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <Text style={{ margin: 10, fontSize: 17 , marginTop: 40 }}>How to show my profile's details:</Text>
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('profile1' , profile1)
                        }}
                        isChecked={profile1}
                        rightTextView={<Text style={styles.checkBoxText}>Show my Email
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('profile2' , profile2)
                        }}
                        isChecked={profile2}
                        rightTextView={<Text style={styles.checkBoxText}>Show my Business address</Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('profile3' , profile3)
                        }}
                        isChecked={profile3}
                        rightTextView={<Text style={styles.checkBoxText}>Show my ABN</Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('profile4' , profile4)
                        }}
                        isChecked={profile4}
                        rightTextView={<Text style={styles.checkBoxText}>Show my Building license
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('profile5' , profile5)
                        }}
                        isChecked={profile5}
                        rightTextView={<Text style={styles.checkBoxText}>Show my Website
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <Text style={{ margin: 10, fontSize: 17 , marginTop: 40 }}>Job notification:</Text>
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChangeSettings('jobNotif' , jobNotif)
                        }}
                        isChecked={jobNotif}
                        rightTextView={<Text style={styles.checkBoxText}>Would you like to receive job notifications?
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    {jobNotif && <>
                    <Text style={{ margin: 10, fontSize: 17 , marginTop: 40 }}>Job notification range:</Text>
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChnageJobNotifRange('10')
                        }}
                        isChecked={jobNotifRange === '10'}
                        rightTextView={<Text style={styles.checkBoxText}>0-10 km
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChnageJobNotifRange('25')
                        }}
                        isChecked={jobNotifRange === '25'}
                        rightTextView={<Text style={styles.checkBoxText}>10-25 km
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChnageJobNotifRange('50')
                        }}
                        isChecked={jobNotifRange === '50'}
                        rightTextView={<Text style={styles.checkBoxText}>25-50 km
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChnageJobNotifRange('100')
                        }}
                        isChecked={jobNotifRange === '100'}
                        rightTextView={<Text style={styles.checkBoxText}>50-100 km
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    <CheckBox
                        style={{ margin: 10 }}
                        onClick={() => {
                            onChnageJobNotifRange('inf')
                        }}
                        isChecked={jobNotifRange === 'inf'}
                        rightTextView={<Text style={styles.checkBoxText}>over 100 km
                    </Text>}
                        checkedCheckBoxColor={'#2196F3'}
                        uncheckedCheckBoxColor={'#999'}
                    />
                    </>}
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.onSave()}>
                    {saveSettingsLoading ? <ActivityIndicator color={'#fff'} />
                      :  <Text style={{ color: '#fff', fontSize: 15 }}>Save</Text>}
                    </TouchableOpacity>
                    </>}
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
