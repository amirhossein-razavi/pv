import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ratio = height / width;

const styles = StyleSheet.create({
    loginLogoContainer: {
        flex: 3,
        backgroundColor: '#1E3148',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: height / 17
    },
    loginLogo: {
        width: ratio * 50,
        height: ratio * 50,
        marginLeft: 40,
    },
    loginLogoText: {
        fontSize: ratio * 13,
        color: '#fff',
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ratio * 10,
        marginBottom: ratio * 10,
    },
    header: {
        fontSize: ratio * 17,
        textAlign: "center",
    },
    loginFormContainer: {
        flex: 5,
        backgroundColor: '#EFEFEF',
    },
    loginForm: {
        flex: 1,
        marginHorizontal: 30,
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
        marginHorizontal: 20,
        flex: 1
    },
    signInButton: {
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
    forgotPass: {
        fontSize: ratio * 10,
        color: '#8F8A99',
        marginTop: 10,
        textAlign: "center"
    },
    registerLinkContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
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