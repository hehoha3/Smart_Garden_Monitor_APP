import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Content from './Content';

interface AppGradientProps {
    children: any;
    colors: string[];
}

export default function AppGradient({ children, colors }: AppGradientProps) {
    return (
        <LinearGradient className='flex-1' colors={colors}>
            <Content>{children}</Content>
        </LinearGradient>
    )
}