import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { maskJs } from 'mask-js'
export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        storeData('user', kirim);
        Alert.alert(MYAPP, 'IP Address berhasil diubah !');
        navigation.replace('Home');

    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
            justifyContent: 'center',
        }}>



            <MyInput label="IP Address" iconname="print" fontSize={24} value={kirim.ipaddress} keyboardType='number-pad' maxLength={15} onChangeText={x => setKirim({ ...kirim, ipaddress: x })} />
            <MyGap jarak={20} />
            {loading && <ActivityIndicator color={colors.primary} size="large" />}

            {!loading && <MyButton warna={colors.foourty} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})