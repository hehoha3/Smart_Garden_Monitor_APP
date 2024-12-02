import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { Canvas, Group, Path, Skia, Text, useFont } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface CircularProgressProps {
    size: number;
    value: number;
    color: string;
    unit: string;
};

export default function CircularProgress({ size, value, color, unit }: CircularProgressProps) {
    // ---------------------------- CONFIG Value & Circle VARIABLEs ----------------------------
    const formattedValue = value / 100;

    const strokeWidth = 20;
    const radius = size / 2 - strokeWidth / 2;

    // ---------------------------- CONFIG Text VARIABLEs ----------------------------
    const fontSize = radius / 2;
    const font = useFont(require("../assets/fonts/Roboto-Bold.ttf"), fontSize);

    const textWidth = font?.getTextWidth(`${value}`) ?? 0;
    const textTranslateX = radius - textWidth * 0.65;
    const textTransform = [{ translateY: size * 0.5 - fontSize * 0.6 }];

    // TEXT Animation
    const textValue = useSharedValue(0);

    useEffect(() => {
        textValue.value = withTiming(
            value,
            { duration: 1000 }
        );
    }, [value]);

    const text = useDerivedValue(() => {
        return `${textValue.value.toFixed(0)}${unit}`;
    }, [textValue]);

    // ---------------------------- ROTATE Circle ----------------------------
    const path = useMemo(() => {
        const skPath = Skia.Path.Make();
        skPath.addCircle(size / 2, size / 2, radius);
        return skPath;
    }, [radius, size]);

    const transform = [
        { rotate: -Math.PI / 2 },
    ];

    // ---------------------------- CONFIG Size ----------------------------
    const style = {
        width: size,
        height: size,
    };

    const origin = {
        x: size / 2,
        y: size / 2,
    };

    // ---------------------------- ANIMATION for Circle Path ----------------------------
    // Shared value for the animated end of the circle path
    const animatedEnd = useSharedValue(0);

    // Update the animated end with timing when formattedValue changes
    useEffect(() => {
        animatedEnd.value = withTiming(formattedValue, { duration: 1000 });
    }, [formattedValue]);

    //! ---------------------------- RETURN ----------------------------
    return (
        <Canvas style={style}>
            <Group origin={origin} transform={transform}>
                <Path
                    end={1}
                    start={0}
                    path={path}
                    style={'stroke'}
                    strokeCap={'round'}
                    color="rgba(255, 255, 255, 0.4)"
                    strokeWidth={strokeWidth}
                />
                <Path
                    start={0}
                    path={path}
                    end={animatedEnd}  // Use the animated end value
                    style={'stroke'}
                    strokeCap={'round'}
                    color={color}
                    strokeWidth={strokeWidth}
                />
            </Group>

            <Text
                x={textTranslateX}
                y={fontSize}
                text={text}
                font={font}
                color={color}
                transform={textTransform}
            />
        </Canvas>
    );
};
