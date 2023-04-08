import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {

      navigation.replace('Home')


    }, 1500)
  }, []);


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Image source={require('../../assets/logo.png')} style={{
          width: windowWidth / 1.2,
          height: windowWidth / 1.2,
        }} />

        <ActivityIndicator size="large" color={colors.white} />
        <Text style={{
          marginTop: 20,
          fontFamily: fonts.secondary[600],
          color: colors.white,
          fontSize: 35,
        }}>NETRA</Text>




      </View>




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
