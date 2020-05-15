import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../Styles/Messaging/usersList';

const { width, height } = Dimensions.get('window');
const ratio = height / width;

class FilteredUsersList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, navigation, token } = this.props;
        const capitalName = user.centreObj.name.slice(0, 1);
        return (
            <TouchableOpacity style={styles.userContainer}
                onPress={() => navigation.navigate('chatRoom', { id: user.user_id._id, token: token, userName: user.centreObj.name, email: user.centreObj.email })}>
                <View style={styles.authorImageContainer}>
                    {user.centreObj.personalInfo.photoUrl ?
                        <Image source={{ uri: user.centreObj.personalInfo.photoUrl }}
                            style={styles.authorImage} />
                        : <View style={styles.authorImageView}>
                            <Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text>
                        </View>
                    }
                </View>
                <View>
                    <Text style={styles.userName}>{user.centreObj.name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon
                        name={'angle-right'}
                        size={ratio * 12}
                        style={{ marginRight: 10 }}
                        color={'#999'}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

export default FilteredUsersList;

