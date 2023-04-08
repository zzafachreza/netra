import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
export default function MyHeader({ menu }) {

  const navigation = useNavigation();
  return (

    <View style={{
      flexDirection: 'row'
    }
    }>
      <View style={{
        flex: 1,
      }}>
        <Text style={{
          fontFamily: fonts.primary[400],
          fontSize: windowWidth / 17
        }}>{menu}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AAAtur')} style={{
        backgroundColor: colors.foourty,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 40,
      }}>
        <Image source={require('../../assets/menu.png')} style={{
          width: 18,
          height: 18,
        }} />
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({});
