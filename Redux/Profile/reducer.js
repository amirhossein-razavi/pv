import * as ActionTypes from '../ActionTypes';
import { Alert } from 'react-native';

const Profile = (state = { jobsPosted: '', jobsSaved: '', posts: '', settings: [], notif1: false, notif2: false, notif3: false, notif4: false, notif5: false, notif6: false, privacy1: false, privacy2: false, profile1: false, profile2: false, profile3: false, profile4: false, profile5: false, jobNotif: false, jobNotifRange: false, settingsLoading: true, saveSettingsLoading: false }, action) => {
    switch (action.type) {
        case (ActionTypes.GETUSERDETAILS):
            const data = action.payload;
            return {
                ...state,
                jobsPosted: data[1],
                jobsSaved: data[2],
                posts: data[0]
            }

        case (ActionTypes.GETUSERSETTINGS):
            const settings = action.payload;

            notif1 = settings.notifications.filter(i => i === 'receiving_comments_on_my_post')
            notif2 = settings.notifications.filter(i => i === 'receiving_reply_to_my_comments_on_post')
            notif3 = settings.notifications.filter(i => i === 'receiving_comments_on_my_job')
            notif4 = settings.notifications.filter(i => i === 'receiving_reply_to_my_comments_on_job')
            notif5 = settings.notifications.filter(i => i === 'receiving_private_message_on_my_job')
            notif6 = settings.notifications.filter(i => i === 'receiving_message')

            privacy1 = settings.privacy.filter(i => i === 'disable_messaging')
            privacy2 = settings.privacy.filter(i => i === 'disable_comments_on_my_posts')

            profile1 = settings.profileDetails.filter(i => i === 'show_my_email')
            profile2 = settings.profileDetails.filter(i => i === 'show_my_business_address')
            profile3 = settings.profileDetails.filter(i => i === 'show_my_abn')
            profile4 = settings.profileDetails.filter(i => i === 'show_my_building_license')
            profile5 = settings.profileDetails.filter(i => i === 'show_my_website')

            jobNotif = settings.jobNotifications.filter(i => i === 'receiving_notification_of_any_job_posted_related_to_my_field')
            return {
                ...state,
                notif1: notif1.length ? true : false,
                notif2: notif2.length ? true : false,
                notif3: notif3.length ? true : false,
                notif4: notif4.length ? true : false,
                notif5: notif5.length ? true : false,
                notif6: notif6.length ? true : false,
                privacy1: privacy1.length ? true : false,
                privacy2: privacy2.length ? true : false,
                profile1: profile1.length ? true : false,
                profile2: profile2.length ? true : false,
                profile3: profile3.length ? true : false,
                profile4: profile4.length ? true : false,
                profile5: profile5.length ? true : false,
                jobNotif: jobNotif.length ? true : false,
                jobNotifRange: settings.jobNotificationsRange,
                settingsLoading: false
            }

        case (ActionTypes.ONCHANGESETTINGS):
            const { prop, value } = action.payload;

            return {
                ...state,
                [prop]: !value,
            }

        case (ActionTypes.ONCHANGEJOBNOTIFRANGE):
            const range = action.payload;
            return {
                ...state,
                jobNotifRange: range,
            }

        case (ActionTypes.SAVESETTINGSSUCCESSFULL):
            Alert.alert('Your Settings Saved Successfull');
            return {
                ...state,
                saveSettingsLoading: false
            }

        case (ActionTypes.USERSETTINGSLOADING):
            return {
                ...state,
                settingsLoading: true
            }

        case (ActionTypes.SAVESETTINGSLOADING):
            return {
                ...state,
                saveSettingsLoading: true
            }

        default:
            return state;
    }
};

export { Profile as default };