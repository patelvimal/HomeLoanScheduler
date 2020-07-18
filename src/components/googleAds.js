import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const GoogleAds = props => {
    return (
        <View style={styles.root}>
            <BannerAd
                unitId="ca-app-pub-4524015669776883/5947618296"
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginTop: 20,
        marginBottom: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#b2b1a9'
    }
});

export default GoogleAds;
