import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import { StatusBar } from 'expo-status-bar'
import gardenBackground from '@/assets/app-images/gardenBG.png'
import morningImg from '@/assets/app-images/morning.png'
import everningImg from '@/assets/app-images/everning.png'
import yesterdayImg from '@/assets/app-images/yesterday.png'
import { useRouter } from 'expo-router'


export default function images() {
    const router = useRouter();

    return (
        <View className='flex-1'>
            <ImageBackground source={gardenBackground} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className='flex-1 justify-end mt-12'>
                        {/* ----------------------------- MORNING ----------------------------- */}
                        <View className={`flex-1 justify-center items-center max-h-56 mb-10`}>
                            <TouchableOpacity onPress={() => router.push('/imagesShow/today_morning')} activeOpacity={0.8} className='w-full h-full rounded-lg overflow-hidden border border-black/60'>
                                {/* Hiển thị hình ảnh nền */}
                                <ImageBackground
                                    source={morningImg}
                                    className='w-full h-full justify-center items-center'
                                    imageStyle={{ resizeMode: 'cover' }}
                                >
                                    <View className="absolute inset-0 bg-black opacity-35" />
                                    {/* Hiển thị text trên hình ảnh */}
                                    <Text className='text-4xl font-bold text-white'>Morning</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        {/* ----------------------------- EVERNING ----------------------------- */}
                        <View className={`flex-1 justify-center items-center max-h-56 mb-10`}>
                            <TouchableOpacity onPress={() => router.push('/imagesShow/today_evening')} activeOpacity={0.8} className='w-full h-full rounded-lg overflow-hidden border border-black/60'>
                                {/* Hiển thị hình ảnh nền */}
                                <ImageBackground
                                    source={everningImg}
                                    className='w-full h-full justify-center items-center'
                                    imageStyle={{ resizeMode: 'cover' }}
                                >
                                    <View className="absolute inset-0 bg-black opacity-35" />
                                    {/* Hiển thị text trên hình ảnh */}
                                    <Text className='text-4xl font-bold text-white'>Afternoon</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        {/* ----------------------------- NEW DAY ----------------------------- */}
                        <View className={`flex-1 justify-center items-center max-h-56 mb-10`}>
                            <TouchableOpacity onPress={() => router.push('/imagesShow/yesterday')} activeOpacity={0.8} className='w-full h-full rounded-lg overflow-hidden border border-black/60'>
                                {/* Hiển thị hình ảnh nền */}
                                <ImageBackground
                                    source={yesterdayImg}
                                    className='w-full h-full justify-center items-center'
                                    imageStyle={{ resizeMode: 'cover' }}
                                >
                                    <View className="absolute inset-0 bg-black opacity-35" />
                                    {/* Hiển thị text trên hình ảnh */}
                                    <Text className='text-4xl font-bold text-white'>Yesterday</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            <StatusBar style='light' />
        </View>
    )
}