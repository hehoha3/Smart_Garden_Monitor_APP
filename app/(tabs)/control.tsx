import React, { useState } from 'react'
import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import controlBackground from '@/assets/app-images/gardenBG_2.png'
import AppGradient from '@/components/AppGradient'
import Card from '@/components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ToggleSwitch from '@/components/ToggleSwitch'
import LightButton from '@/components/LightButton'
import FanButton from '@/components/FanButton'
import { ref, set, get, onValue } from 'firebase/database';
import { database } from '@/firebaseConfig';


export default function ControlScreen() {
    const [pump_LEFT_value, setPump_LEFT_value] = useState(0);
    const [pump_RIGHT_value, setPump_RIGHT_value] = useState(0);

    const [lights, setLights] = useState(0);
    const [fans, setFans] = useState(0);

    //! ------------------------------- Func update to DB -------------------------------
    const updateDatabase = (path: string, value: number) => {
        const dbRef = ref(database, path);
        set(dbRef, value)
            .then(() => console.log(`Data successfully written to ${path}: ${value}`))
            .catch((error) => console.error("Error writing data: ", error));
    };

    const handleTogglePump_LEFT = (value: number) => {
        setPump_LEFT_value(value ? 1 : 0);
        updateDatabase('Relay/pump_left', value ? 1 : 0);
    };

    const handleTogglePump_RIGHT = (value: number) => {
        setPump_RIGHT_value(value ? 1 : 0);
        updateDatabase('Relay/pump_right', value ? 1 : 0);
    };

    const handleLights = (value: number) => {
        setLights(value ? 1 : 0);
        updateDatabase('Relay/lights', value ? 1 : 0);
    };

    const handleFans = (value: number) => {
        setFans(value ? 1 : 0);
        updateDatabase('Relay/fans', value ? 1 : 0);
    };

    return (
        <View className='flex-1'>
            <ImageBackground source={controlBackground} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className='flex-1 justify-end'>
                        {/* ----------------------- PUMPs Control -----------------------*/}
                        <Card className='bg-white/50 mb-4'>
                            <View className='flex-row justify-start mb-4'>
                                <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Pumps Control</Text>
                                <MaterialCommunityIcons name="water-pump" size={24} color="#026fd4" />
                            </View>

                            <View className='flex-row justify-between mx-5'>
                                <View className='justify-center items-center'>
                                    <ToggleSwitch onToggle={handleTogglePump_LEFT} />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Left</Text>
                                    </View>
                                </View>

                                <View className='justify-center items-center'>
                                    <ToggleSwitch onToggle={handleTogglePump_RIGHT} />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Right</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>


                        {/* ----------------------- LIGHTs Control -----------------------*/}
                        <Card className='flex-row justify-around items-center bg-white/70 mb-4'>
                            <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Lights Control</Text>
                            <LightButton onPress={handleLights} />
                        </Card>

                        {/* ----------------------- FANs Control -----------------------*/}
                        <Card className='flex-row justify-around items-center bg-white/70 mb-4'>
                            <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Fans Control</Text>
                            <FanButton onPress={handleFans} />
                        </Card>
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            <StatusBar style='light' />
        </View>
    )
}