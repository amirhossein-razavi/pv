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
    formInput: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    textArea: {
        flex: 1,
        fontSize: ratio * 9,
        height: height / 6
    },
    textInput: {
        flex: 1,
        fontSize: ratio * 9,
    },
    categoryText: {
        fontSize: ratio * 8.5,
        color: '#555'
    },
    iconContainer: {
        width: ratio * 17,
        height: ratio * 17,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 50
    },
    ImageContainer: {
        fontSize: ratio * 9,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
        marginTop: 10,
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
        paddingVertical: 10,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 17,
        color: '#fff'
    },
    categoryList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    categoryListText: {
        fontSize: ratio * 9,
        color: '#333'
    },
    androidPicker: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    }
});

export default styles;