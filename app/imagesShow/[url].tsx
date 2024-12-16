import { View, SafeAreaView, FlatList, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageComp from '@/components/ImageComp'
import AppGradient from '@/components/AppGradient'
import gardenBackground from '@/assets/app-images/gardenBG.png'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'


export default function imagesShow() {
    const { url } = useLocalSearchParams();
    const [images, setImages] = useState<string[]>([])

    // Hàm tải dữ liệu hình ảnh từ server
    useEffect(() => {
        const fetchImages = async () => {
            let imageUrls = [];
            for (let i = 1; i <= 15; i++) {
                imageUrls.push(`http://192.168.1.29:8080/${url}/image_${i}.jpg`)
            }

            setImages(imageUrls)
        }

        fetchImages()
    }, [url])

    return (
        <View className='flex-1'>
            <ImageBackground source={gardenBackground} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className='flex-1 justify-end mt-4'>
                        <Pressable onPress={() => router.back()} className='left-2 z-10'>
                            <AntDesign name='leftcircleo' size={40} color="white" />
                        </Pressable>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key nếu không có ID
                            data={images}
                            renderItem={({ item }) => (
                                <ImageComp url={item} />
                            )}
                        />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}