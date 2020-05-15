import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    currentUserMessage: {
        backgroundColor: '#1E9AD1',
        maxWidth: width / 2,
        padding: 10,
        margin: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    userMessage: {
        backgroundColor: '#0759AA',
        maxWidth: width / 2,
        padding: 10,
        margin: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    userMessageText: {
        color: '#fff',
        fontSize: ratio * 8
    },
    userMessageTime: {
        color: '#CECECE',
        fontSize: ratio * 8,
        textAlign: "right",
        marginTop: 5
    },
    textArea: {
        flex: 6,
        fontSize: ratio * 9,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10
    },
    textAreaContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#E8E8E8',
        alignItems: "center"
    },
    sendIcon: {
        marginRight: 10
    },
});

export default styles;