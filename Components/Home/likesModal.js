import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../../Styles/Home/likesModal';

const LikesModal = ({ like }) => {
    const capitalName = like.company_name.slice(0, 1);
    return (
        <View style={styles.container}>
            <View style={styles.authorImageContainer}>
                {like.image ?
                    <Image source={{ uri: like.image }} style={styles.authorImage} />
                    : <View style={styles.authorImageView}><Text style={styles.authorCapitalName}>{capitalName.toUpperCase()}</Text></View>
                }
            </View>
            <View style={styles.authorDetails}>
                <Text style={styles.likedName}>{like.company_name}</Text>
            </View>
        </View>
    );
}



export default LikesModal;
