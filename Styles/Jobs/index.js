import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    jobsComponent: {
        backgroundColor: '#efefef'
    },
    filterButton: {
        flexDirection: "row",
        backgroundColor: '#2196f3',
        width: width / 2,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: width / 4,
        height: 40
    },
    textArea: {
        flex: 1,
        fontSize: 15,
        backgroundColor: '#ededed',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    title: {
        flex: 1,
        fontSize: 19,
    },
    sendButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30,
    },
    sendButtonText: {
        fontSize: 19,
        color: '#fff'
    },
    androidPicker: {
        paddingHorizontal: 5,
        backgroundColor: '#ededed',
        borderRadius: 10,
        marginTop: 10,
    }
});

export default styles;