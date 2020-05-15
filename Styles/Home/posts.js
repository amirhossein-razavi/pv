import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    postComponent: {
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    hidePost: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    undoContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
        flex: 6,
        justifyContent: "center",
        paddingLeft: 15,
        paddingTop: 20,
    },
    authorName: {
        fontSize: ratio * 9,
        color: '#6b6b6b'
    },
    postTime: {
        fontSize: ratio * 7,
        color: '#b2b2b2'
    },
    option: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
        marginRight: 5,
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
    postOptions: {
        flexDirection: "row",
        paddingLeft: 20,
        marginTop: 20,
    },
    likeComment: {
        flex: 1,
        flexDirection: "row",
    },
    likesCounter: {
        color: "#515151",
        marginRight: 15,
        fontSize: ratio * 7.5
    },
    commentsCounter: {
        fontSize: ratio * 7.5,
        color: "#515151",
    },
    postDescriptionContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    postDescription: {
        flexWrap: "wrap",
        fontSize: ratio * 7.5,
        textAlign: "left"
    },
    postDescriptionMore: {
        color: '#777',
        marginTop: 5,
    },
    postLogos: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: '#999',
        marginTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
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
        color: '#333',
        fontSize: ratio * 7.5,
        paddingHorizontal: 10
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
    modalHeader: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#283E4A',
        color: '#fff'
    },
    container: {
        paddingTop: 20,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: ratio * 10
    },
    textArea: {
        fontSize: ratio * 9,
        height: height / 6,
    },
    textAreaContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: '#fff'
    },
    ImageContainer: {
        fontSize: ratio * 9,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 10,
        marginTop: 15,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        height: height / 4,
        backgroundColor: '#D6D6D6'
    },
    plusImage: {
        height: 50,
        width: 50,
    },
    plusImageText: {
        fontSize: 17,
        color: '#555',
        marginTop: 10
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    cancelButtonContainer: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginRight: 10
    },
    buttonText: {
        fontSize: 17,
        color: '#fff'
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
});

export default styles;