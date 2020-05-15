import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    jobComponent: {
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    authorImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15,
        paddingLeft: 15,
    },
    authorImage: {
        width: width / 8,
        height: width / 8,
        borderRadius: 50
    },
    authorImageView: {
        width: width / 8,
        height: width / 8,
        borderRadius: 50,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
    },
    authorCapitalName: {
        color: '#fff',
        fontSize: ratio * 12
    },
    authorDetails: {
        flex: 4,
        justifyContent: "center",
        paddingLeft: 10,
        paddingTop: 15,
    },
    authorName: {
        fontSize: ratio * 9,
        color: '#6b6b6b'
    },
    role: {
        fontSize: ratio * 7,
        color: '#b2b2b2',
        fontWeight: "bold",
    },
    jobTime: {
        flex: 3,
        alignItems: "flex-end",
        marginRight: 15,
        paddingTop: 20,
    },
    jobTimeText: {
        fontSize: ratio * 7.2,
        color: '#b2b2b2'
    },
    jobTitle: {
        fontSize: ratio * 10,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    jobDetails: {
        paddingHorizontal: 15,
        paddingTop: 5,
        alignItems: "center",
        flexWrap: "wrap",
    },
    detailsTitle: {
        fontSize: ratio * 8,
        marginRight: 10,
    },
    field: {
        marginRight: 10,
        padding: 5,
        backgroundColor: 'rgba(9 , 139 , 239 , .3)',
        borderRadius: 5,
    },
    fieldText: {
        fontSize: ratio * 7,
        color: 'rgb(9 , 139 , 239)',
    },
    sub_field: {
        marginRight: 10,
        padding: 5,
        backgroundColor: 'rgba(8 , 8 , 192 , .3)',
        borderRadius: 5,
    },
    sub_fieldText: {
        fontSize: ratio * 7,
        color: 'rgb(8 , 8 , 192)',
    },
    detailText: {
        fontSize: ratio * 7,
        color: '#333',
        paddingRight: 10,
        lineHeight: 25,
    },
    postImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        paddingHorizontal: 20,
    },
    postImage: {
        width: '100%',
        height: 200,
        maxHeight: 400,
        resizeMode: 'contain'
    },
    postDescriptionContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    postDescription: {
        flexWrap: "wrap",
        fontSize: ratio * 9,
        textAlign: "left"
    },
    postDescriptionMore: {
        color: '#777',
        marginTop: 5,
    },
    postLogos: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 15,
    },
    commentLogoContainer: {
        flexDirection: "row",
        marginRight: 15,
        marginTop: 10,
        paddingRight: 10,
        paddingVertical: 5,
        borderRightWidth: 1.5,
        borderRightColor: '#999',
        justifyContent: "center",
        alignItems: "center",
    },
    commentsCounterContainer: {
        marginLeft: 5,
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
    },
    commentsCounterNumber: {
        color: '#fff',
        fontSize: ratio * 5.7
    },
    addCommentContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#e9e9e9',
        height: 40,
        paddingLeft: 20,
        margin: 10,
        borderRadius: 15,
    },
    commentTextInput: {
        flex: 9,
        color: '#333'
    },
    addCommentButton: {
        flex: 3,
        height: 30,
        backgroundColor: '#283E4A',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#283E4A',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },
    moreCommentsContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 50,
    },
    moreComments: {
        backgroundColor: '#283E4A',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    moreCommentsText: {
        color: '#fff',
        textAlign: "center",
    },
    textArea: {
        fontSize: ratio * 9,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    sendButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    sendButtonText: {
        fontSize: ratio * 11,
        color: '#fff'
    },
    modalHeader: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#283E4A',
        color: '#fff'
    },
});

export default styles;