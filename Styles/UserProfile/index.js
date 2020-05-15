import { StyleSheet, Dimensions } from 'react-native';
import { ceil } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
    },
    userInfo: {
        flex: 1,
        backgroundColor: '#3E5967',
        paddingBottom: 10
    },
    topInfoPart: {
        flex: 1,
        flexDirection: "row",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop: 25
    },
    profileImage: {
        width: width / 4.5,
        height: width / 4.5,
        borderRadius: 50
    },
    profileImageView: {
        width: width / 4.5,
        height: width / 4.5,
        borderRadius: 50,
        backgroundColor: '#2196F3',
        justifyContent: "center",
        alignItems: "center",
    },
    profileCapitalName: {
        color: '#fff',
        fontSize: ratio * 17
    },
    detailsContainer: {
        flex : 4,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 15,
        paddingTop: 15
    },
    counterContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    counterInner: {
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    counterInnerText: {
        fontSize: ratio * 7,
        color: '#fff',
        marginTop: 5
    },
    counterInnerNumber: {
        fontSize: ratio * 10,
        color: '#fff'
    },
    counterInnerBorder: {
        borderRightWidth: 1.5,
        borderRightColor: '#fff',
    },
    bottomInfoPart: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 15
    },
    bioContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        backgroundColor: '#3E5967',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    titles: {
        fontSize: ratio * 10,
        color: '#fff'
    },
    bio: {
        fontSize: ratio * 8,
        color: '#fff',
        fontWeight: "bold"
    },
    userPosts: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#efefef',
        justifyContent: "center",
        alignItems: "center"
    },
    messageButton:{
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: '#2196F3',
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        fontSize: ratio * 9
    }
});

export default styles;