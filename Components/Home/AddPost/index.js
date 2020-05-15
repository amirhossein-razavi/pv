import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

import { postApi } from '../../../Redux/Home/axios';
import { onPostLoading } from '../../../Redux/Home/ActionCreators';
import styles from '../../../Styles/Home/addPost';

const plusImage = require('../../../src/assets/images/plus.png')
const { width, height } = Dimensions.get('window');
const ratio = height / width;

const mapDispatchToProps = (dispatch) => ({
    postApi: (body, token, navigation) => dispatch(postApi(body, token, navigation)),
    onPostLoading: () => dispatch(onPostLoading()),
});

const mapStateToProps = (state) => ({
    currentUser: state.authLoading.currentUser,
    token: state.authLoading.token,
    postLoading: state.home.postLoading,
});

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            imageData: [],
            imageHeight: ''
        }
    }

    static navigationOptions = {
        title: 'Add Post',
    }

    pickImage() {
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            this.setState({
                imageData: image,
                imageHeight: image.height * (width / image.width)
            })
        });
    }

    takeImage() {
        ImagePicker.openCamera({
            includeBase64: true
        }).then(image => {
            this.setState({
                imageData: image,
                imageHeight: image.height * (width / image.width)
            })
        });
    }

    onPost() {
        const { postApi, currentUser, token, onPostLoading, navigation } = this.props;
        const { imageData, text } = this.state;
        const body = {
            'post': text,
            'file_type': "image",
            'src_url': imageData.data ? `data:${imageData.mime};base64,${imageData.data}` : '',
            'company': currentUser.company._id,
            'user': currentUser._id,
        };
        if (text) {
            onPostLoading();
            postApi(body, token, navigation);
        } else Alert.alert('Please Write Something')
    }

    render() {
        const { text, imageData, imageHeight } = this.state;
        const { postLoading } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Post Description</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            value={text}
                            placeholder="Write Your Post"
                            placeholderTextColor="#999"
                            multiline={true}
                            onChangeText={(text) => this.setState({ text })}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Image</Text>
                    {imageData.path ? <>
                        <Image source={{ uri: imageData.path }} style={{ width: width / 1.2, height: imageHeight, borderRadius: 10, marginTop: 10 }} />
                        <TouchableOpacity onPress={() => this.setState({ imageData: [] })}>
                            <Icon
                                name={'trash'}
                                size={ratio * 13}
                                color={'#555'}
                                style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    </>
                        : <TouchableOpacity style={styles.ImageContainer} onPress={() => this.ActionSheet.show()}>
                            <Image source={plusImage} style={styles.plusImage} />
                            <Text style={styles.plusImageText}>Add Image</Text>
                        </TouchableOpacity>}
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Take Picture', 'Library', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        if (index === 0) {
                            this.takeImage();
                        } else if (index === 1) {
                            this.pickImage();
                        }
                    }} />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPost()}>
                        {postLoading ? <ActivityIndicator color={'#fff'} />
                            : <Text style={styles.buttonText}>Post</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
