import React, { useEffect, useState } from 'react'
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
import TimePicker from '@/components/TimePicker'


export default function ControlScreen() {
    const [pumpLeft, setPumpLeft] = useState(0);
    const [pumpRight, setPumpRight] = useState(0);
    const [lights, setLights] = useState(0);
    const [fans, setFans] = useState(0);

    const [initialPumpsTimeOn, setInitialPumpsTimeOn] = useState('');
    const [initialLightsTimeOn, setInitialLightsTimeOn] = useState('');
    const [initialFansTimeOn, setInitialFansTimeOn] = useState('');

    const [initialPumpsTimeOff, setInitialPumpsTimeOff] = useState('');
    const [initialLightsTimeOff, setInitialLightsTimeOff] = useState('');
    const [initialFansTimeOff, setInitialFansTimeOff] = useState('');


    //! Listen for changes from the database
    useEffect(() => {
        //* Listen the changes of Relay
        const pumpLeftRef = ref(database, 'Relay/pump_left');
        const pumpLeftListener = onValue(pumpLeftRef, (snapshot) => {
            const value = snapshot.val();
            setPumpLeft(value);
        });

        const pumpRightRef = ref(database, 'Relay/pump_right');
        const pumpRightListener = onValue(pumpRightRef, (snapshot) => {
            const value = snapshot.val();
            setPumpRight(value);
        });

        const lightsRef = ref(database, 'Relay/lights');
        const lightsListener = onValue(lightsRef, (snapshot) => {
            const value = snapshot.val();
            setLights(value);
        });

        const fansRef = ref(database, 'Relay/fans');
        const fansListener = onValue(fansRef, (snapshot) => {
            const value = snapshot.val();
            setFans(value);
        });


        //* Listen the changes of PUMPs Timer

        const pumpsTimerOnRef = ref(database, 'Timer/pumps/ON');
        const pumpsTimerOnListener = onValue(pumpsTimerOnRef, (snapshot) => {
            const value = snapshot.val();
            setInitialPumpsTimeOn(value);
        });

        const pumpsTimerOffRef = ref(database, 'Timer/pumps/OFF');
        const pumpsTimerOffListener = onValue(pumpsTimerOffRef, (snapshot) => {
            const value = snapshot.val();
            setInitialPumpsTimeOff(value);
        });

        //* Listen the changes of LIGHTs Timer

        const lightsTimerOnRef = ref(database, 'Timer/lights/ON');
        const lightsTimerOnListener = onValue(lightsTimerOnRef, (snapshot) => {
            const value = snapshot.val();
            setInitialLightsTimeOn(value);
        });

        const lightsTimerOffRef = ref(database, 'Timer/lights/OFF');
        const lightsTimerOffListener = onValue(lightsTimerOffRef, (snapshot) => {
            const value = snapshot.val();
            setInitialLightsTimeOff(value);
        });

        //* Listen the changes of LIGHTs Timer

        const fansTimerOnRef = ref(database, 'Timer/fans/ON');
        const fansTimerOnListener = onValue(fansTimerOnRef, (snapshot) => {
            const value = snapshot.val();
            setInitialFansTimeOn(value);
        });

        const fansTimerOffRef = ref(database, 'Timer/fans/OFF');
        const fansTimerOffListener = onValue(fansTimerOffRef, (snapshot) => {
            const value = snapshot.val();
            setInitialFansTimeOff(value);
        });

        // Cleanup listeners when component unmounts
        return () => {
            pumpLeftListener();
            pumpRightListener();
            lightsListener();
            fansListener();

            pumpsTimerOnListener();
            pumpsTimerOffListener();

            lightsTimerOnListener();
            lightsTimerOffListener();

            fansTimerOnListener();
            fansTimerOffListener();
        };
    }, []);


    //! ------------------------------- Func update to DB -------------------------------
    const updateDatabase = (path: string, value: any) => {
        const dbRef = ref(database, path);
        set(dbRef, value)
            .then(() => console.log(`Data successfully written to ${path}: ${value}`))
            .catch((error) => console.error("Error writing data: ", error));
    };

    // Handle TIMERs

    const handlePumpsTimeSet = (timeOn: string, timeOff: string) => {
        // Gửi thời gian lên Firebase
        updateDatabase('Timer/pumps/ON', timeOn);
        updateDatabase('Timer/pumps/OFF', timeOff);
    };

    const handleLightsTimeSet = (timeOn: string, timeOff: string) => {
        // Gửi thời gian lên Firebase
        updateDatabase('Timer/lights/ON', timeOn);
        updateDatabase('Timer/lights/OFF', timeOff);
    };

    const handleFansTimeSet = (timeOn: string, timeOff: string) => {
        // Gửi thời gian lên Firebase
        updateDatabase('Timer/fans/ON', timeOn);
        updateDatabase('Timer/fans/OFF', timeOff);
    };


    // Handle RELAYS
    const handleTogglePump_LEFT = (value: number) => {
        updateDatabase('Relay/pump_left', value ? 1 : 0);
    };

    const handleTogglePump_RIGHT = (value: number) => {
        updateDatabase('Relay/pump_right', value ? 1 : 0);
    };

    const handleLights = (value: number) => {
        updateDatabase('Relay/lights', value ? 1 : 0);
    };

    const handleFans = (value: number) => {
        updateDatabase('Relay/fans', value ? 1 : 0);
    };



    //! -------------------------------------- RETURN --------------------------------------
    return (
        <View className='flex-1'>
            <ImageBackground source={controlBackground} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className='flex-1 justify-end'>
                        {/* ----------------------- Set timer -----------------------*/}
                        <View className='mb-9'>
                            <TimePicker title='Pumps' initialTimeOn={initialPumpsTimeOn} initialTimeOff={initialPumpsTimeOff} onTimeSet={handlePumpsTimeSet} />
                            <TimePicker title='Lights' initialTimeOn={initialLightsTimeOn} initialTimeOff={initialLightsTimeOff} onTimeSet={handleLightsTimeSet} />
                            <TimePicker title='Fans' initialTimeOn={initialFansTimeOn} initialTimeOff={initialFansTimeOff} onTimeSet={handleFansTimeSet} />
                        </View>


                        {/* ----------------------- PUMPs Control -----------------------*/}
                        <Card className='bg-white/50 mb-7'>
                            <View className='flex-row justify-start mb-4'>
                                <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Pumps Control</Text>
                                <MaterialCommunityIcons name="water-pump" size={24} color="#026fd4" />
                            </View>

                            <View className='flex-row justify-between mx-5'>
                                <View className='justify-center items-center'>
                                    <ToggleSwitch onToggle={handleTogglePump_LEFT} isOnState={pumpLeft === 1} />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Left</Text>
                                    </View>
                                </View>

                                <View className='justify-center items-center'>
                                    <ToggleSwitch onToggle={handleTogglePump_RIGHT} isOnState={pumpRight === 1} />
                                    <View className='flex-row justify-start items-center mx-5 mt-2'>
                                        <Text className='text-xl font-bold tracking-tight text-gray-800/80 mr-2'>Right</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>


                        {/* ----------------------- LIGHTs Control -----------------------*/}
                        <Card className='flex-row justify-around items-center bg-white/70 mb-7'>
                            <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Lights Control</Text>
                            <LightButton onPress={handleLights} isOnState={lights === 1} />
                        </Card>

                        {/* ----------------------- FANs Control -----------------------*/}
                        <Card className='flex-row justify-around items-center bg-white/70 mb-4'>
                            <Text className='text-2xl font-bold tracking-tight text-gray-800/80 mr-2'>Fans Control</Text>
                            <FanButton onPress={handleFans} isOnState={fans === 1} />
                        </Card>
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            <StatusBar style='light' />
        </View>
    )
}