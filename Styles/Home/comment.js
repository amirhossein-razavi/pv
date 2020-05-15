import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },
    replyContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        paddingLeft: 10
    },
    commentAuthor: {
        flexDirection: "row",
        paddingLeft: 5,
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
        width: width / 11,
        height: width / 11,
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
        width: width / 11,
        height: width / 11,
        borderRadius: 50,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
    },
    authorCapitalName: {
        color: '#fff',
        fontSize: ratio * 9
    },
    authorDetailsContainer: {
        flex: 4,
        justifyContent: "center",
    },
    authorName: {
        fontSize: ratio * 8,
        color: '#6b6b6b'
    },
    commentTime: {
        fontSize: ratio * 7,
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
        fontSize: ratio * 8,
        textAlign: "left"
    },
    commentOptions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingLeft: 25,
        paddingBottom: 20,
    },
    addReplyContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#e9e9e9',
        height: 40,
        paddingLeft: 20,
        marginHorizontal: 30,
        marginVertical: 15,
        borderRadius: 15,
    },
    replyTextInput: {
        flex: 9,
        color: '#333',
        fontSize: ratio * 8
    },
    addReplyButton: {
        flex: 3,
        backgroundColor: '#2196f3',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        height: 30
        // marginVertical: 5,
        // paddingHorizontal: 10,
    },
});

export default styles;