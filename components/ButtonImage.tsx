import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

interface ButtonImageProps {
    image: string;
    title: string;
    url: string;
}

export default function ButtonImage({ image, title, url }: ButtonImageProps) {
    const router = useRouter();

    return (
        <View className={`flex-1 justify-center items-center max-h-56 mb-10`}>
            <TouchableOpacity onPress={() => router.push(`/images-show/${url}`)} activeOpacity={0.8} className='w-full h-full rounded-lg overflow-hidden'>
                {/* Hiển thị hình ảnh nền */}
                <ImageBackground
                    source={{ uri: `${image}` }}
                    className='w-full h-full justify-center items-center'
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <View className="absolute inset-0 bg-black opacity-35" />
                    {/* Hiển thị text trên hình ảnh */}
                    <Text className='text-2xl font-bold text-white'>{title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}