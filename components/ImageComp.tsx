import { View, Text, Image } from 'react-native'
import React from 'react'

interface ImageCompProps {
    url: string
}

export default function ImageComp({ url }: ImageCompProps) {
    return (
        <View className='bg-[#70a1ff] my-2 rounded-md justify-center items-center border-2 border-amber-900'>
            <Image source={{ uri: url }} className='h-[200px] w-full' />
        </View>
    )
}