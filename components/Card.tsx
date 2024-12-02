import { View, Text } from 'react-native'
import React from 'react'

interface CardProps {
    className: string;
    children: any;
}

export default function Card({ className, children }: CardProps) {
    return (
        <View className={`w-full p-6 border border-gray-300 rounded-lg shadow ${className}`}>
            {children}
        </View>
    )
}