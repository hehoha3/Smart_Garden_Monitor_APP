import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ToggleSwitch({ onToggle }: any) {
    const [isON, setIsON] = useState(false);
    const translateX = new Animated.Value(isON ? 45 : 0);  // For Animation

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isON ? 45 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [isON]);

    const off_Icon = <Ionicons name="water-outline" size={25} color="black" />

    const on_Icon = <Ionicons name="water" size={30} color="blue" />

    const toggleProcess = () => {
        const newValue = !isON;
        setIsON(newValue);
        onToggle(newValue);
    };

    return (
        <TouchableOpacity onPress={toggleProcess}>
            <View style={[styles.switch, { backgroundColor: isON ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }]}>
                <Animated.View
                    style={[
                        styles.toggle,
                        {
                            transform: [{ translateX }],
                            backgroundColor: isON ? '#FFD700' : '#555',
                        },
                    ]}
                >
                    {isON ? on_Icon : off_Icon}
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switch: {
        width: 100,
        height: 50,
        borderRadius: 25,
        padding: 5,
        justifyContent: 'center',
    },
    toggle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});