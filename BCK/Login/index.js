import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {

    if (kirim.password == null) {
      Alert.alert(MYAPP, 'Kode Akses Harus di isi !');
    } else {

      if (kirim.password !== 'sbalavaz') {
        Alert.alert(MYAPP, 'Kode Akses salah !');
      } else {
        setLoading(true);
        console.log(kirim);


        storeData('user', {
          password: kirim.password,
          ipaddress: '000.000.000.000'
        });
        navigation.replace('Home')
      }







    }




  }

  useEffect(() => {

    // const backAction = () => {
    //   Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, [])

  return (
    <>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white, position: 'relative' }}>


        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <Image
              source={require('../../assets/logo.png')}
              style={
                {
                  width: windowWidth / 1.7,
                  height: windowWidth / 2,
                  resizeMode: 'contain'
                }
              }
            />



          </View>


        </View>
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
          <MyInput autoFocus
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            fontSize={20}
            secureTextEntry={true}
            label="Kode Akses"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <MyGap jarak={20} />
          {!loading &&


            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.foourty}
              Icons="log-in-outline"
            />

          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({});
