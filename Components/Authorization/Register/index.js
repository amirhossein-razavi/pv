import React, { Component } from 'react';
import { View, Text, Image, StatusBar, ActivityIndicator, ScrollView, TextInput, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import registerAPI from '../../../Redux/Register/axios';
import { onChange, onLoading } from '../../../Redux/Register/ActionCreators';
import styles from '../../../Styles/Register';

const logo = require('../../../src/assets/logos/Logo.png');

const { width, height } = Dimensions.get('window');
const ratio = height / width;

const mapStateToProps = (state) => ({
    firstname: state.register.firstname,
    lastname: state.register.lastname,
    email: state.register.email,
    password: state.register.password,
    loading: state.register.loading,
    signInButtonClicked: state.register.signInButtonClicked,
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (prop, value) => dispatch(onChange(prop, value)),
    onLoading: () => dispatch(onLoading()),
    registerApi: (apiProps) => dispatch(registerAPI(apiProps)),
});

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verifyPassword: '',
            showPassword: false,
            showVerifyPassword: false,
        }
    }

    static navigationOptions = {
        headerShown: false
    }

    onRegister() {
        const { verifyPassword } = this.state;
        const { onLoading, registerApi, firstname, lastname, email, password, navigation } = this.props;
        const apiProps = { firstname, lastname, email, password, navigation };

        const isValid = () => {
            const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
            const validPassword = password === verifyPassword;

            if (validEmail && validPassword && firstname && lastname) {
                return 'valid'
            } else if (!firstname) {
                return 'Enter your firstName'
            } else if (!lastname) {
                return 'Enter your lastName'
            } else if (!email) {
                return 'Enter your email'
            } else if (!password) {
                return 'Enter your passwprd'
            } else if (!validEmail) {
                return 'Enter a valid email'
            } else if (!validPassword) {
                return 'Passwords do not match'
            }
        }

        const valid = isValid();

        if (valid === 'valid') {
            onLoading();
            registerApi(apiProps);
        } else Alert.alert(valid);
    }

    render() {
        const { showPassword, showVerifyPassword, verifyPassword } = this.state;
        const { firstname, lastname, password, email, loading, signUpButtonClicked, onChange } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <StatusBar backgroundColor="#1E3148" barStyle="light-content" />
                    <View style={styles.registerLogoContainer}>
                        <Image source={logo} style={styles.registerLogo} />
                        <Text style={styles.registerLogoText}>
                            Project Vectors
                        </Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Sign Up
                     </Text>
                    </View>
                    <View style={styles.registerFormContainer}>
                        <View style={styles.registerForm}>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'user'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    value={firstname}
                                    placeholder={'First Name'}
                                    style={styles.textInput}
                                    onChangeText={(firstname) => onChange('firstname', firstname)}
                                    onSubmitEditing={() => { this.lastNameTextInput.focus() }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'user-tie'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    value={lastname}
                                    placeholder={'Last Name'}
                                    style={styles.textInput}
                                    onChangeText={(lastname) => onChange('lastname', lastname)}
                                    ref={(input) => { this.lastNameTextInput = input; }}
                                    onSubmitEditing={() => { this.emailTextInput.focus() }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'at'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    value={email}
                                    placeholder={'Email'}
                                    style={styles.textInput}
                                    onChangeText={(email) => onChange('email', email)}
                                    email-address
                                    ref={(input) => { this.emailTextInput = input; }}
                                    onSubmitEditing={() => { this.passwordTextInput.focus() }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'lock'}
                                    size={ratio * 11}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    value={password}
                                    placeholder={'Password'}
                                    style={styles.textInput}
                                    onChangeText={(password) => onChange('password', password)}
                                    secureTextEntry={showPassword ? false : true}
                                    visible-password
                                    ref={(input) => { this.passwordTextInput = input; }}
                                    onSubmitEditing={() => { this.verifyPasswordTextInput.focus() }}
                                />
                                <Icon
                                    name={'eye'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                    style={{ marginRight: 10 }}
                                    onPress={() => this.setState({ showPassword: !showPassword })}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Icon
                                    name={'lock'}
                                    size={ratio * 11}
                                    color={'#8F8A99'}
                                />
                                <TextInput
                                    value={verifyPassword}
                                    placeholder={'Verify Password'}
                                    style={styles.textInput}
                                    onChangeText={(verifyPassword) => this.setState({ verifyPassword })}
                                    secureTextEntry={showVerifyPassword ? false : true}
                                    visible-password
                                    ref={(input) => { this.verifyPasswordTextInput = input; }}
                                    onSubmitEditing={() => this.onRegister()}
                                />
                                <Icon
                                    name={'eye'}
                                    size={ratio * 12}
                                    color={'#8F8A99'}
                                    style={{ marginRight: 10 }}
                                    onPress={() => this.setState({ showVerifyPassword: !showVerifyPassword })}
                                />
                            </View>
                            <View
                                style={[styles.signUpButton,
                                { backgroundColor: !signUpButtonClicked ? '#716ACA' : 'rgba(113 , 106 , 202 , 0.8)' }]}
                            >
                                {loading ? <ActivityIndicator size={30} color={'#283E4A'} style={{ marginLeft: 20 }} />
                                    : <Text
                                        style={[styles.buttonText, { color: !signUpButtonClicked ? '#fff' : '#ddd' }]}
                                        onPress={() => this.onRegister()}>
                                        Sign Up
                                  </Text>
                                }
                            </View>
                            <Text style={styles.agreeTerms}>
                                By clicking Sign Up, you agree to our Terms & Condition, and Privacy Policy.
                        </Text>
                        </View>
                    </View>
                    <View style={styles.registerLinkContainer}>
                        <Text style={styles.accountText}>
                            have an account ?
                    </Text>
                        <Text style={styles.registerLink} onPress={() => this.props.navigation.navigate('login')}>
                            sign in
                    </Text>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
