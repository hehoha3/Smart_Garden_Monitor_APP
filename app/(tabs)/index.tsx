import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import gardenBackground from '@/assets/app-images/gardenBG.png'
import AppGradient from '@/components/AppGradient'
import Card from '@/components/Card'
import WaveProgress from '@/components/WaveProgress';
import CircularProgress from '@/components/CircularProgress';
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebaseConfig';

export default function HomeScreen() {
    // ------------------------------- ALL VALUEs -------------------------------
    const [waterQuan_data, setWaterQuan_data] = useState<number>(0);

    const [soilLeft, setSoilLeft] = useState<number>(0);
    const [soilRight, setSoilRight] = useState<number>(0);

    const [temp, setTemp] = useState<number>(0);
    const [hum, setHum] = useState<number>(0);



    // ------------------------------- FETCH DATAs -------------------------------
    useEffect(() => {
        // PATH of data on Realtime Database
        const waterRef = ref(database, 'Water_quantity');
        const soilLeftRef = ref(database, 'Soil/moisture_LEFT');
        const soilRightRef = ref(database, 'Soil/moisture_RIGHT');
        const tempRef = ref(database, 'DTH11/temperature');
        const humRef = ref(database, 'DTH11/humidity');

        const unsubscribeWater = onValue(waterRef, (snapshot) => {
            if (snapshot.exists()) {
                setWaterQuan_data(snapshot.val());
            } else {
                setWaterQuan_data(0);
            }
        });

        const unsubscribeSoilLeft = onValue(soilLeftRef, (snapshot) => {
            if (snapshot.exists()) {
                setSoilLeft(snapshot.val());
            } else {
                setSoilLeft(0);
            }
        });

        const unsubscribeSoilRight = onValue(soilRightRef, (snapshot) => {
            if (snapshot.exists()) {
                setSoilRight(snapshot.val());
            } else {
                setSoilRight(0);
            }
        });

        const unsubscribeTemp = onValue(tempRef, (snapshot) => {
            if (snapshot.exists()) {
                setTemp(snapshot.val());
            } else {
                setTemp(0);
            }
        });

        const unsubscribeHum = onValue(humRef, (snapshot) => {
            if (snapshot.exists()) {
                setHum(snapshot.val());
            } else {
                setHum(0);
            }
        });

        // Cleanup all listener when component is unmount
        return () => {
            unsubscribeWater();
            unsubscribeSoilLeft();
            unsubscribeSoilRight();
            unsubscribeTemp();
            unsubscribeHum();
        };
    }, []);


    //! ------------------------------- RETURN -------------------------------
    return (
        <View className='flex-1'>
            <ImageBackground source={gardenBackground} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className='flex-1 justify-end mt-12'>

                        {/* ----------------------- Soil moisture -----------------------*/}
                        <View className='flex-row justify-around items-center mb-6'>
                            <Text className='text-3xl font-bold tracking-tight text-white mr-2'>Water Quantity</Text>
                            <WaveProgress size={150} value={waterQuan_data} outerColor='#178bca' outerTextColor='#178bca' innerTextColor='#a4dbf8' />
                        </View>


                        {/* ----------------------- Soil moisture -----------------------*/}
                        <Card className='bg-white/50 mb-4'>
                            <View className='flex-row justify-start mb-4'>
                                <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Soil moisture</Text>
                                <FontAwesome5 name="leaf" size={22} color="#208a12" />
                            </View>

                            <View className='flex-row justify-between mx-5'>
                                <View className='justify-center items-center'>
                                    <WaveProgress size={120} value={soilLeft} outerColor='#bd6902' outerTextColor='#bd6902' innerTextColor='#db9a4b' />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Left</Text>
                                    </View>
                                </View>

                                <View className='justify-center items-center'>
                                    <WaveProgress size={120} value={soilRight} outerColor='#bd6902' outerTextColor='#bd6902' innerTextColor='#db9a4b' />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Right</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>


                        {/* ----------------------- Temperature & Humidity ----------------------- */}
                        <Card className='bg-white/70'>
                            <View className='flex-row justify-between mx-5 mb-4'>
                                <View className='flex-1 flex-row justify-start items-center'>
                                    <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Temperature</Text>
                                    <FontAwesome5 name="temperature-high" size={21} color='#fc8123' />
                                </View>
                                <CircularProgress size={120} value={temp} color='#fc8123' unit='°C' />
                            </View>

                            <View className='flex-row justify-between mx-5'>
                                <View className='flex-1 flex-row justify-start items-center'>
                                    <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-1'>Temperature</Text>
                                    <Ionicons name="water" size={21} color="#178bca" />
                                </View>
                                <CircularProgress size={120} value={hum} color='#178bca' unit=' %' />
                            </View>
                        </Card>
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            <StatusBar style='light' />
        </View>
    )
}