import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { InterstitialAd, TestIds, BannerAd, BannerAdSize, RewardedAd, AdEventType, RewardedAdEventType } from '@react-native-firebase/admob';

const GoogleAds = props => {
    return (
        <View style={styles.root}>
            <BannerAd
                unitId={TestIds.BANNER}
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
        // borderBottomColor: '#b2b1a9',
        // borderTopColor: '#b2b1a9',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        // borderStyle: 'dashed'
    }
});

export default GoogleAds;