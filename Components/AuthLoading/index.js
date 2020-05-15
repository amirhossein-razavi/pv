import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import { getUser } from '../../StorageRepo';
import { saveUser } from '../../Redux/AuthLoading/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
  saveUser: (userInfo) => dispatch(saveUser(userInfo)),
});

const mapStateToProps = (state) => ({
  userToken: state.authLoading.token,
});

class AuthLoading extends React.Component {
  componentDidMount() {
    this.userLoggedin();
  }

  userLoggedin = async () => {
    const userInfo = await getUser();
    userInfo && this.props.saveUser(userInfo);
    this.props.navigation.navigate(this.props.userToken ? 'app' : 'login');
  };


  render() {
    return (
      <View>
        <ActivityIndicator color={'#283E4A'} style={styles.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    marginTop: 100,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
