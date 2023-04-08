import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import moment from 'moment';

export default function AAInput({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        fid_user: route.params.id,
        jenis_kelamin: 'Laki-laki',
        tinggi_badan: '',
        berat_badan: '',
        lingkar_lengan: '',
        lingkar_perut: '',
        sistole: '',
        diastole: '',
        hemoglobin: '',
        gula_darah: '',
        p1: 'TIDAK',
        p2: 'TIDAK',
        p3: 'TIDAK',
        p4: 'TIDAK',
        p5: 'TIDAK',


    });


    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'insert_kesehatan', kirim).then(res => {
            console.log(res.data);
            navigation.navigate('SHasil', res.data);
        })
    }

    const [pilih, setPilih] = useState({
        1: {
            ya: false,
            tidak: true
        },
        2: {
            ya: false,
            tidak: true
        },
        3: {
            ya: false,
            tidak: true
        },
        4: {
            ya: false,
            tidak: true
        },
        5: {
            ya: false,
            tidak: true
        }
    })


    useEffect(() => {


    }, []);


    const MyCek = ({ nomor, label }) => {
        return (
            <View>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12
                }}>{label}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                }}>
                    <TouchableOpacity onPress={() => {
                        setPilih({
                            ...pilih,
                            [nomor]: { ya: true, tidak: false },
                        });
                        setKirim({
                            ...kirim,
                            ['p' + nomor]: 'YA'
                        })
                    }} style={{
                        width: 50,
                        marginHorizontal: 10,
                        height: 30,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: pilih[nomor].ya ? colors.foourty : colors.white,
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: pilih[nomor].ya ? colors.white : colors.black
                        }}>YA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setPilih({
                            ...pilih,
                            [nomor]: { ya: false, tidak: true }
                        })
                        setKirim({
                            ...kirim,
                            ['p' + nomor]: 'TIDAK'
                        })
                    }

                    } style={{
                        marginHorizontal: 10,
                        width: 50,
                        height: 30,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: pilih[nomor].tidak ? colors.foourty : colors.white,
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: pilih[nomor].tidak ? colors.white : colors.black,
                        }}>TIDAK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.myback3,
            padding: 20,
        }}>
            <MyHeader menu='Input Kesehatan kamu yuk!' />
            <MyGap jarak={20} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <View
                            style={{

                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}>
                            <Icon type="ionicon" name='calendar' color={colors.black} size={16} />
                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.black,
                                    left: 10,
                                    fontSize: 12,
                                }}>
                                Tanggal
                            </Text>
                        </View>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={kirim.tanggal}
                            mode="date"
                            placeholder="tanggal"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    backgroundColor: colors.zavalabs,
                                    backgroundColor: colors.zavalabs,
                                    borderRadius: 10,
                                    marginTop: 5,
                                    fontFamily: fonts.secondary[600],
                                    borderColor: colors.primary,
                                    borderWidth: 0,
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                setKirim({
                                    ...kirim,
                                    tanggal: date
                                })
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyPicker label="Jenis Kelamin" onValueChange={x => setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })} iconname="male-female" data={[
                            { label: 'Laki-laki', value: 'Laki-laki' },
                            { label: 'Perempuan', value: 'Perempuan' },
                        ]} />
                    </View>
                </View>
                <MyGap jarak={10} />
                <MyCek label="Makan Sayur dan Buah 5 porsi sehari :" nomor={1} /><MyGap jarak={10} />
                <MyCek label="Olahraga rutin min. 30 menit/hari sebanyak 3-5x/minggu :" nomor={2} /><MyGap jarak={10} />
                <MyCek label="Merokok :" nomor={3} /><MyGap jarak={10} />
                <MyCek label="Konsumsi minuman beralkohol :" nomor={4} /><MyGap jarak={10} />
                <MyCek label="Istirahat 7-8 jam/hari :" nomor={5} /><MyGap jarak={10} />




                <MyInput iconname='create' label='Tinggi Badan (cm)' onChangeText={x => { setKirim({ ...kirim, tinggi_badan: x }) }} /><MyGap jarak={10} />
                <MyInput iconname='create' label='Berat Badan (kg)' onChangeText={x => { setKirim({ ...kirim, berat_badan: x }) }} /><MyGap jarak={10} />
                <MyInput iconname='create' label='Lingkar Lengan (cm)' onChangeText={x => { setKirim({ ...kirim, lingkar_lengan: x }) }} /><MyGap jarak={10} />
                <MyInput iconname='create' label='Lingkar Perut (cm)' onChangeText={x => { setKirim({ ...kirim, lingkar_perut: x }) }} /><MyGap jarak={10} />
                <View
                    style={{

                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                    }}>

                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 12,
                        }}>
                        Tekanan Darah (mmHg)
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}><MyInput iconname='create' label='Sistole' onChangeText={x => { setKirim({ ...kirim, sistole: x }) }} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}><MyInput iconname='create' label='Diastole' onChangeText={x => { setKirim({ ...kirim, diastole: x }) }} />
                    </View>
                </View>
                <MyGap jarak={10} />
                <MyInput iconname='create' label='Hemoglobin (gr/dl)' onChangeText={x => { setKirim({ ...kirim, hemoglobin: x }) }} /><MyGap jarak={10} />
                <MyInput iconname='create' label='Gula Darah (mg/dl)' onChangeText={x => { setKirim({ ...kirim, gula_darah: x }) }} /><MyGap jarak={10} />




            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.foourty} Icons="save-outline" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})