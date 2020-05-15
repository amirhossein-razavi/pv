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
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 15,
        paddingTop: 15
    },
    profileName: {
        fontSize: ratio * 13,
        color: '#fff'
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
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    viewSelected: {
        borderBottomWidth: 1,
        borderBottomColor: '#2196F3',
        paddingBottom: 5,
        marginRight: 20,
        marginTop: 4,
    },
    textSelected: {
        color: '#2196F3',
        fontWeight: "bold",
        fontSize: ratio * 9,
    },
    viewUnselected: {
        marginRight: 20,
    },
    textUnselected: {
        fontSize: ratio * 8,
    },
    saveButton: {
        flex: 1,
        width: width / 1.5,
        marginHorizontal: width / 6,
        backgroundColor: '#2196f3',
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 5
    },
    checkBoxText: {
        fontSize: 14,
        marginLeft: 5,
        color: '#555'
    }
});

export default styles;