import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, Alert, Platform, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { BottomModal, ModalContent } from 'react-native-modals';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

import PlacesInput from './AutoComplete';
import { editApi, deleteImageApi } from '../../Redux/Jobs/axios'
import { onJobLoading, onDeleteImageLoading, onChangeLocation, onSelectLocation } from '../../Redux/Jobs/ActionCreators'
import subCategories from '../../src/json/trades'
import styles from '../../Styles/Jobs/addJob';

const mapDispatchToProps = (dispatch) => ({
    editApi: (body, token, props, navigation) => dispatch(editApi(body, token, props, navigation)),
    deleteImageApi: (body, token) => dispatch(deleteImageApi(body, token)),
    onJobLoading: () => dispatch(onJobLoading()),
    onDeleteImageLoading: () => dispatch(onDeleteImageLoading()),
    onChangeLocation: (data) => dispatch(onChangeLocation(data)),
    onSelectLocation: (data) => dispatch(onSelectLocation(data)),
});

const mapStateToProps = (state) => ({
    currentUser: state.authLoading.currentUser,
    token: state.authLoading.token,
    editLoading: state.jobs.editLoading,
    deleteImageLoading: state.jobs.deleteImageLoading,
    location: state.jobs.location,
});

const { width, height } = Dimensions.get('window');
const ratio = height / width;
const plusImage = require('../../src/assets/images/plus.png')
const categories = ['Select Category', 'Sole Trader', 'Builder', 'Supplier', 'Construction Company', 'Consultancy']
const GOOGLE_API_KEY = 'AIzaSyAHlSxi3Xmaq1S3qqQvlkXjjoSAkTrOnUQ';

class EditJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.getParam('item'),
            title: this.props.navigation.getParam('item').title,
            text: this.props.navigation.getParam('item').description,
            modalVisible: false,
            subModalVisible: false,
            dateModalVisible: false,
            category: this.props.navigation.getParam('item').field,
            subCategory: this.props.navigation.getParam('item').sub_field,
            date: this.props.navigation.getParam('item').startDate,
            datePicker: new Date(),
            newDate: '',
            location: this.props.navigation.getParam('item').location,
            image: this.props.navigation.getParam('item').image,
            imageData: [],
            imageHeight: '',
            calendarVisible: false
        }
    }

    componentDidMount() {
        this.props.onChangeLocation(this.state.location);
    }

    selectCategory(category) {
        this.setState({
            category,
            modalVisible: false
        })
    }
    selectSubCategory(subCategory) {
        this.setState({
            subCategory,
            subModalVisible: false
        })
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

    confirmDeletePhoto() {
        Alert.alert(
            'Are You Sure ?',
            '',
            [
                { text: 'Delete', onPress: () => this.deletePhoto() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deletePhoto() {
        const { onDeleteImageLoading, token, deleteImageApi } = this.props;
        const { item, image } = this.state;
        onDeleteImageLoading();
        const body = {
            'id': item._id,
            'image': image
        }
        deleteImageApi(body, token);
        setInterval(() => {
            this.setState({
                image: ''
            })
        }, 3000)
    }

    editJob() {
        const { currentUser, token, onJobLoading, editApi, navigation, location } = this.props;
        const { date, title, text, category, subCategory, imageData, datePicker, item, image, newDate } = this.state;
        onJobLoading();
        const formatedDate = newDate && `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`
        const body = {
            'title': title,
            'description': text,
            'field': category === 'Select Category' ? '' : category,
            'startDate': newDate ? formatedDate : date,
            'location': location,
            'coords': {
                'lat': 35.6891975,
                'lng': 51.3889736,
            },
            'sub_field': subCategory === 'Select Sub Category' ? '' : subCategory,
            'image': imageData.data && `data:${imageData.mime};base64,${imageData.data}`,
            'user': currentUser._id,
        }
        const editProps = {
            'title': title,
            'description': text,
            'field': category === 'Select Category' ? '' : category,
            'sub_field': subCategory === 'Select Sub Category' ? '' : subCategory,
            'location': location,
            'startDate': datePicker ? formatedDate : date,
            'image': imageData ? imageData.path : image ? image : '',
            'id': item._id,
        }
        editApi(body, token, editProps, navigation);
    }

    cancelEditJob() {
        const { onChangeLocation, navigation } = this.props;
        onChangeLocation('');
        navigation.goBack();
    }

    render() {
        const { text, modalVisible, category, subModalVisible, subCategory, date, dateModalVisible, imageData, imageHeight, title, datePicker, image, newDate, calendarVisible } = this.state;
        const { editLoading, deleteImageLoading, onChangeLocation, onSelectLocation, location } = this.props;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Job Title</Text>
                    <View style={styles.formInput}>
                        <TextInput
                            value={title}
                            style={styles.textInput}
                            placeholder="Enter Job Title"
                            placeholderTextColor="#777"
                            onChangeText={(title) => this.setState({ title })}
                        />
                    </View>
                </View>
                {Platform.OS === 'ios' ? <View style={styles.container}>
                    <Text style={styles.title}>Looking For</Text>
                    <TouchableOpacity style={[styles.formInput, { justifyContent: 'space-between' }]}
                        onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.categoryText}>{category}</Text>
                        <Icon
                            name={modalVisible ? 'angle-up' : 'angle-down'}
                            size={ratio * 11}
                            color={'#999'}
                            style={{ marginRight: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                    : <View style={styles.container}>
                        <Text style={styles.title}>Looking For</Text>
                        <View style={styles.androidPicker}>
                            <Picker
                                selectedValue={category}
                                // style={styles.container}
                                onValueChange={(itemValue) =>
                                    this.setState({ category: itemValue })
                                }>
                                {categories && categories.map((category, index) => {
                                    return (
                                        <Picker.Item label={category} value={category} key={index} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>}
                <BottomModal
                    visible={modalVisible}
                    onTouchOutside={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <ModalContent>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Picker
                                selectedValue={category}
                                style={{ height: 200, width: width }}
                                onValueChange={(itemValue) =>
                                    this.setState({ category: itemValue })
                                }>
                                {categories && categories.map((category, index) => {
                                    return (
                                        <Picker.Item label={category} value={category} key={index} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </ModalContent>
                </BottomModal>
                {(category === 'Sole Trader' && Platform.OS === 'ios') ?
                    <View style={styles.container}>
                        <Text style={styles.title}>Sub Category</Text>
                        <TouchableOpacity style={[styles.formInput, { justifyContent: 'space-between' }]}
                            onPress={() => this.setState({ subModalVisible: true })}>
                            <Text style={styles.categoryText}>{subCategory}</Text>
                            <Icon
                                name={subModalVisible ? 'angle-up' : 'angle-down'}
                                size={ratio * 11}
                                color={'#999'}
                                style={{ marginRight: 5 }}
                            />
                        </TouchableOpacity>
                    </View>
                    : (category === 'Sole Trader' && Platform.OS === 'android') ?
                        <View style={styles.container}>
                            <Text style={styles.title}>Sub Category</Text>
                            <View style={styles.androidPicker}>
                                <Picker
                                    selectedValue={subCategory}
                                    onValueChange={(itemValue) =>
                                        this.setState({ subCategory: itemValue })
                                    }>
                                    {subCategories && subCategories.map((category, index) => {
                                        return (
                                            <Picker.Item label={category} value={category} key={index} />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </View>
                        : <></>
                }
                <BottomModal
                    visible={subModalVisible}
                    onTouchOutside={() => {
                        this.setState({ subModalVisible: false });
                    }}
                >
                    <ModalContent>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Picker
                                selectedValue={subCategory}
                                style={{ height: 200, width: width }}
                                onValueChange={(itemValue) =>
                                    this.setState({ subCategory: itemValue })
                                }>
                                {subCategories && subCategories.map((category, index) => {
                                    return (
                                        <Picker.Item label={category} value={category} key={index} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </ModalContent>
                </BottomModal>
                <View style={styles.container}>
                    <Text style={styles.title}>Start Date</Text>
                    <TouchableOpacity style={[styles.formInput, { justifyContent: 'space-between' }]}
                        onPress={() => {
                            Platform.OS === 'ios' ? this.setState({ dateModalVisible: true })
                                : this.setState({ calendarVisible: true })
                        }}>
                        {newDate ? <Text style={styles.categoryText}>{`${newDate.getFullYear()} / ${newDate.getMonth()} / ${newDate.getDate()}`}</Text>
                            : <Text style={styles.categoryText}>{date.slice(0, 10)}</Text>}
                        <Icon
                            name={subModalVisible ? 'angle-up' : 'angle-down'}
                            size={ratio * 11}
                            color={'#999'}
                            style={{ marginRight: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                {calendarVisible &&
                    <DateTimePicker
                        value={datePicker}
                        is24Hour={true}
                        onChange={(event, date) => {
                            event.type === 'set' ? this.setState({ newDate: date, calendarVisible: false })
                                : this.setState({ calendarVisible: false })
                        }}
                    />
                }
                <BottomModal
                    visible={dateModalVisible}
                    onTouchOutside={() => {
                        this.setState({ dateModalVisible: false });
                    }}
                >
                    <ModalContent>
                        <View>
                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                                <Text style={{ fontSize: ratio * 11 }}>Select Start Date</Text>
                            </View>
                            <DateTimePicker
                                value={newDate ? newDate : datePicker}
                                is24Hour={true}
                                onChange={(event, date) => this.setState({ newDate: date })}
                            />
                        </View>
                    </ModalContent>
                </BottomModal>
                <View style={styles.container}>
                    <Text style={styles.title}>Location</Text>
                    <PlacesInput
                        placeHolder={'Enter Job Location'}
                        queryCountries={['au']}
                        googleApiKey={GOOGLE_API_KEY}
                        onChangeLocation={onChangeLocation}
                        onSelectLocation={onSelectLocation}
                        location={location}
                        requiredTimeBeforeSearch={200}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Job Description</Text>
                    <View style={styles.formInput}>
                        <TextInput
                            value={text}
                            style={styles.textArea}
                            placeholder="Enter Job Description"
                            placeholderTextColor="#999"
                            multiline={true}
                            onChangeText={(text) => this.setState({ text })}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Image</Text>
                    {image ? <>
                        <Image source={{ uri: image }} style={{ width: width / 1.2, height: 200, borderRadius: 10, marginTop: 10 }} />
                        {deleteImageLoading ? <View>
                            <ActivityIndicator color={'#283E4A'} style={{ textAlign: "right", marginTop: 10, marginRight: 10 }} />
                        </View>
                            : <TouchableOpacity onPress={() => this.confirmDeletePhoto()}>
                                <Icon
                                    name={'trash'}
                                    size={ratio * 13}
                                    color={'red'}
                                    style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
                                />
                            </TouchableOpacity>}
                    </>
                        : imageData.path ? <>
                            <Image source={{ uri: imageData.path }} style={{ width: width / 1.2, height: imageHeight, borderRadius: 10, marginTop: 10 }} />
                            <TouchableOpacity onPress={() => this.pickImage()}>
                                <Icon
                                    name={'edit'}
                                    size={ratio * 13}
                                    color={'#2196F3'}
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
                <View style={[styles.container, { flexDirection: "row" }]}>
                    <TouchableOpacity style={[styles.buttonContainer, { flex: 1, backgroundColor: 'red' }]} onPress={() => this.cancelEditJob()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonContainer, { flex: 1, marginLeft: 15 }]} onPress={() => this.editJob()}>
                        {editLoading ? <ActivityIndicator color={'#fff'} />
                            : <Text style={styles.buttonText}>Edit</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
