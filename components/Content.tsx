import { SafeAreaView } from 'react-native'
import React from 'react'

export default function Content({ children }: any) {
    return (
        <SafeAreaView className='flex-1 mx-5 my-12'>
            {children}
        </SafeAreaView>
    )
}