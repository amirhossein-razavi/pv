import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },
    replyContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        paddingLeft: 20
    },
    commentAuthor: {
        flexDirection: "row",
        paddingTop: 20,
    },
    authorImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    authorImage: {
        width: width / 10,
        height: width / 10,
        borderRadius: 50
    },
    replyAuthorImage: {
        width: width / 12,
        height: width / 12,
        borderRadius: 50
    },
    authorImageView: {
        width: width / 10,
        height: width / 10,
        borderRadius: 50,
        backgroundColor: '#283E4A',
        justifyContent: "center",
        alignItems: "center",
    },
    replyAuthorImageView: {
        width: width / 12,
        height: width / 12,
        borderRadius: 50,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
    },
    authorCapitalName: {
        color: '#fff',
        fontSize: 20
    },
    authorDetailsContainer: {
        flex: 4,
        justifyContent: "center",
    },
    authorName: {
        fontSize: 13,
        color: '#6b6b6b'
    },
    commentTime: {
        fontSize: 13,
        color: '#b2b2b2'
    },
    commentTextContainer: {
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    replyTextContainer: {
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
    commentText: {
        flexWrap: "wrap",
        fontSize: 15,
        textAlign: "left"
    },
    commentReply: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    addReplyContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#e9e9e9',
        height: 40,
        paddingLeft: 20,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 15,
    },
    replyTextInput: {
        flex: 9,
        color: '#333',
        marginLeft: 10
    },
    addReplyButton: {
        flex: 3,
        height: 30,
        backgroundColor: '#2196F3',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },
    commentOptions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingLeft: 25,
        paddingBottom: 20,
    },
});

export default styles;