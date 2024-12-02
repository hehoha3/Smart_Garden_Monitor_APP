import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import FanOff from '@/assets/app-images/fan_off.png'
import FanOn from '@/assets/app-images/fan_on.png'

export default function FanButton({ onPress, isOnState }: any) {
    const [isOn, setIsOn] = useState(isOnState);

    useEffect(() => {
        setIsOn(isOnState);
    }, [isOnState]);

    const handlePress = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onPress(newValue);
    };

    return (
        <TouchableOpacity onPress={handlePress} className='my-[-20px]'>
            <Image
                source={isOn ? FanOn : FanOff}
                className='w-[120px] h-[120px]'
            />
        </TouchableOpacity>
    );
};