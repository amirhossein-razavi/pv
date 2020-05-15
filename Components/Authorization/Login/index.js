import React, { Component } from 'react';
import { View, Text, Image, TextInput, StatusBar, Dimensions, Alert, ActivityIndicator, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import loginAPI from '../../../Redux/Login/axios';
import { onChange, onLoading } from '../../../Redux/Login/ActionCreators';
import styles from '../../../Styles/Login';

const logo = require('../../../src/assets/logos/Logo.png');

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const mapStateToProps = (state) => ({
    username: state.login.username,
    password: state.login.password,
    loading: state.login.loading,
    signInButtonClicked: state.login.signInButtonClicked,
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (prop, value) => dispatch(onChange(prop, value)),
    onLoading: () => dispatch(onLoading()),
    loginApi: (apiProps) => dispatch(loginAPI(apiProps)),
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
        }
    }

    static navigationOptions = {
        headerShown: false
    }


    onLogin() {
        const { onLoading, loginApi, username, password, navigation } = this.props;
        const apiProps = { username, password, navigation };

        const isValid = () => {
            if (!username) {
                return 'Enter your Username'
            } else if (!password) {
                return 'Enter your Password'
            } else return 'valid'
        }

        const valid = isValid();

        if (valid === 'valid') {
            onLoading();
            loginApi(apiProps);
        } else Alert.alert(valid);
    }

    render() {

        const { onChange, username, password, loading, signInButtonClicked } = this.props;
        const { showPassword } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#1E3148" barStyle="light-content" />
                <View style={styles.loginLogoContainer}>
                    <Image source={logo} style={styles.loginLogo} />
                    <Text style={styles.loginLogoText}>
                        Project Vectors
                        </Text>
                </View>
                <KeyboardAvoidingView style={{ flex: 8 }} behavior={Platform.OS === 'ios' ? "padding" : ''} enabled>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Sign in
                     </Text>
                    </View>
                    <View style={styles.loginFormContainer}>
                        <View style={styles.loginForm}>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'user'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    placeholder={'Username'}
                                    value={username}
                                    style={styles.textInput}
                                    onChangeText={(username) => onChange('username', username)}
                                    email-address
                                    onSubmitEditing={() => { this.passwordTextInput.focus() }}
                                    returnKeyType={'next'}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'lock'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    placeholder={'Password'}
                                    value={password}
                                    style={styles.textInput}
                                    onChangeText={(password) => onChange('password', password)}
                                    secureTextEntry={showPassword ? false : true}
                                    visible-password
                                    ref={(input) => { this.passwordTextInput = input; }}
                                    onSubmitEditing={() => this.onLogin()}
                                    returnKeyType={'go'}
                                />
                                <Icon
                                    name={'eye'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                    style={{ marginRight: 10 }}
                                    onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                                />
                            </View>
                            <View
                                style={[styles.signInButton,
                                { backgroundColor: !signInButtonClicked ? '#716ACA' : 'rgba(113 , 106 , 202 , 0.8)' }]}
                            >
                                {loading ? <ActivityIndicator size={30} color={'#283E4A'} />
                                    : <Text
                                        style={[styles.buttonText, { color: !signInButtonClicked ? '#fff' : '#ddd' }]}
                                        onPress={() => this.onLogin()}>
                                        Sign in
                                  </Text>
                                }
                            </View>
                            <Text
                                style={styles.forgotPass}
                                onPress={() => Linking.openURL("https://account.projectvectors.com.au/oauth/forgotpassword?clientId=a399599e5421e052b8eb9f458880b82895a3832939d7a7db0a3264fa82f65da5&callbackUrl=https://pvn.projectvectors.com.au/auth/callback&returnUrl=")}>
                                I forgot my credentials
                        </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.registerLinkContainer}>
                    <Text style={styles.accountText} onPress={() => this.props.test(username)}>
                        Dont have an account ?
                    </Text>
                    <Text style={styles.registerLink} onPress={() => this.props.navigation.navigate('register')}>
                        Sign Up
                    </Text>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
