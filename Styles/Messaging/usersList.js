import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    userContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    authorImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 15,
        // paddingLeft: 15,
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
    userName: {
        fontSize: ratio * 9,
        marginLeft: 15
    },
});

export default styles;