import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
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
        backgroundColor: '#2196F3',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 17,
        color: '#fff'
    },
});

export default styles;