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

import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';







export default function Home({ navigation }) {

  const modelJson = require('../../model/model.json');
  const metadataJson = require('../../model/metadata.json');

  const loadModel = async () => {
    const model = await tf.loadGraphModel(fetch(modelJson));
    const metadata = await fetch(metadataJson);
    const metadataJson = await metadata.json();
    return { model, metadata: metadataJson };
  };





  const predictImage = async (imageUri) => {
    const { model, metadata } = await loadModel();
    const imageTensor = tf.browser.fromPixels({ uri: imageUri });
    const normalizedTensor = imageTensor
      .resizeNearestNeighbor([metadata.inputSize, metadata.inputSize])
      .toFloat()
      .div(255.0)
      .expandDims();
    const prediction = await model.predict(normalizedTensor).data();
    const predictedClassIndex = prediction.indexOf(Math.max(...prediction));
    console.log(metadata.classes[[predictedClassIndex]])
    return metadata.classes[predictedClassIndex];
  };



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


  //   const fileUri = 'NON-HTTP-URI-GOES-HERE';      
  // const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
  // 	encoding: FileSystem.EncodingType.Base64,
  // });
  // const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  // const raw = new Uint8Array(imgBuffer)  
  // const imageTensor = decodeJpeg(raw);


  const takePicture = async () => {

    const options = { quality: 0.5, base64: true };
    // console.log(_refCamera.current)
    const data = await _refCamera.current.takePictureAsync(options);
    console.log(data.uri);
    predictImage(data.uri)


  };

  useEffect(() => {

  }, [])


  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);




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