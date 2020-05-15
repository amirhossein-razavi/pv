import { StyleSheet , Dimensions } from 'react-native';
const {width , height} = Dimensions.get('window');
const ratio = height / width;


const styles = StyleSheet.create({
    registerLogoContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#1E3148',
        alignItems: 'center',
        padding: ratio * 10,
        paddingTop: ratio * 15,
    },
    registerLogo: {
        width: ratio * 25,
        height: ratio * 25,
    },
    registerLogoText: {
        fontSize: ratio * 11,
        color: '#fff',
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
    },
    headerContainer: {
        flex: 1,
        marginVertical: ratio * 10,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: ratio * 18,
        textAlign: "center",
    },
    registerFormContainer: {
        flex: 5,
        backgroundColor: '#EFEFEF',
    },
    registerForm: {
        flex: 1,
        marginHorizontal: ratio * 15,
    },
    formInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#fff',
        height: ratio * 25,
        paddingLeft: 20,
        margin: 10,
        color: '#8F8A99',
        borderRadius: 15,
    },
    textInput: {
        fontSize: ratio * 10,
        marginLeft: 20,
        flex: 1
    },
    signUpButton: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 30,
        marginTop: 20,
        marginHorizontal: width / 8,
        height: ratio * 30,
        borderColor: '#716ACA',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: ratio * 13,
        color: 'white',
        flex: 1,
        textAlign: "center"
    },
    agreeTerms: {
        fontSize: ratio * 9,
        color: '#8F8A99',
        margin: 10,
        textAlign: "center",
        lineHeight: 25,
    },
    registerLinkContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    accountText: {
        fontSize: ratio * 10,
        color: '#8F8A99',
        marginRight: 10,
    },
    registerLink: {
        fontSize: ratio * 11,
        color: '#2A3D59',
    },
});

export default styles;