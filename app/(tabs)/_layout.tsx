import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
    return (
        <Tabs initialRouteName="index" screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
            <Tabs.Screen
                name='index'
                options={{
                    tabBarLabel: "Monitor",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='flower-tulip' size={24} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name='control'
                options={{
                    tabBarLabel: "Control",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='home-lightning-bolt' size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}