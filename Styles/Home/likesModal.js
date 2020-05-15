import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        backgroundColor: '#f7f7f7'
    },
    authorImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    authorImage: {
        width: width / 7,
        height: width / 7,
        borderRadius: 50,
        backgroundColor: '#283E4A',
    },
    authorImageView: {
        width: width / 7,
        height: width / 7,
        borderRadius: 50,
        backgroundColor: '#283E4A',
        justifyContent: "center",
        alignItems: "center",
    },
    authorCapitalName: {
        color: '#fff',
        fontSize: 20
    },
    authorDetails: {
        flex: 4,
        justifyContent: "center",
        paddingLeft: 10,
        paddingVertical: 15,
    },
    likedName: {
        fontSize: 18,
        color: '#6b6b6b'
    },
});

export default styles;