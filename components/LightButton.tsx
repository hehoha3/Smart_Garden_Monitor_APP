import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import LightOff from '@/assets/app-images/bulb_off.png'
import LightOn from '@/assets/app-images/bulb_on.png'

export default function LightButton({ onPress, isOnState }: any) {
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
                source={isOn ? LightOn : LightOff}
                className='w-[120px] h-[120px]'
            />
        </TouchableOpacity>
    );
};