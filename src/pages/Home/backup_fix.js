import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, PermissionsAndroid, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';

import { RNCamera } from 'react-native-camera';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';




export default function Home({ navigation }) {


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: MYAPP,
                    message: "Izinkan Aplikasi untuk akses kamera ?",
                    buttonNegative: "TOLAK",
                    buttonPositive: "IZINKAN"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const takePicture = async () => {

        const options = { quality: 0.5, base64: true };
        // console.log(_refCamera.current)
        const data = await _refCamera.current.takePictureAsync(options);
        console.log(data.uri);
        getImageData(data.uri);

    };



    const [isLoading, setIsLoading] = useState(true);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                await tf.ready();
                const model = await mobilenet.load();
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        loadModel();
    }, []);

    const classifyImage = async (imageData) => {
        try {
            const pixels = tf.browser.fromPixels(imageData);
            const resized = tf.image.resizeBilinear(pixels, [224, 224]);
            const batched = resized.expandDims(0);
            const predictions = await model.classify(batched);
            setPrediction(predictions[0].className);
            console.log('prediksi', predictions[0].className)
        } catch (err) {
            console.log(err);
        }
    };

    const getImageData = async (uri) => {
        try {
            const response = await fetch(uri, {}, { isBinary: true });
            const imageData = await response.arrayBuffer();
            const image = await jpeg.decode(imageData, true);
            classifyImage(image);
        } catch (err) {
            console.log('eror', err);
        }
    };


    const _refCamera = useRef();



    return (

        <View style={styles.container}>
            <RNCamera
                // onCameraReady={handleCameraStream}
                captureAudio={false}
                ref={_refCamera}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}

            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP</Text>
                </TouchableOpacity>
            </View>
        </View>




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});