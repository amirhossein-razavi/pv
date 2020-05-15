import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    textArea: {
        flex: 1,
        fontSize: ratio * 9,
    },
    textAreaContainer: {
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 6,
        paddingHorizontal: 15,
    },
    settingsButton:{
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 10,
        marginTop: 10
    },
    disableText:{
        fontSize: 16,
        marginBottom: 5
    }
});

export default styles;